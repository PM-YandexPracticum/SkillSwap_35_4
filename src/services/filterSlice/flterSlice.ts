import { createSlice, createSelector } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { mockUser, Subcategory } from '../../api/types';
import { getUsersApi } from '../../api';

export type InteractionType = 'all' | 'canTeach' | 'wantToLearn';

export type UserGender = 'any' | 'male' | 'female';

interface FilterState {
  users: mockUser[];
  loading: boolean;
  error: string | null;
  filters: {
    interactionType: InteractionType;
    skillsID: number[];
    userGender: UserGender;
    cities: string[];
  };
}

const initialState: FilterState = {
  users: [],
  loading: false,
  error: null,
  filters: {
    interactionType: 'all',
    skillsID: [],
    userGender: 'any',
    cities: [],
  },
};

export const usersFilterSlice = createSlice({
  name: 'usersFilter',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<mockUser[]>) => {
      state.users = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    // Экшены фильтров
    updateActivityType: (state, action: PayloadAction<InteractionType>) => {
      state.filters.interactionType = action.payload;
    },
    updateSkills: (state, action: PayloadAction<number[]>) => {
      state.filters.skillsID = action.payload;
    },
    updateAuthorGender: (state, action: PayloadAction<UserGender>) => {
      state.filters.userGender = action.payload;
    },
    updateCities: (state, action: PayloadAction<string[]>) => {
      state.filters.cities = action.payload;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    applyFilters: (
      state,
      action: PayloadAction<Partial<FilterState['filters']>>,
    ) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

export const fetchUsers = () => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const users = await getUsersApi();
    dispatch(setUsers(users));
    dispatch(setError(null));
  } catch (error) {
    dispatch(setError('Ошибка загрузки пользователей'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const selectAllUsers = (state: { usersFilter: FilterState }) =>
  state.usersFilter.users;

export const selectFilters = (state: { usersFilter: FilterState }) =>
  state.usersFilter.filters;

export const selectLoading = (state: { usersFilter: FilterState }) =>
  state.usersFilter.loading;

export const selectError = (state: { usersFilter: FilterState }) =>
  state.usersFilter.error;

const hasMatchingSkills = (
  userSkills: Subcategory[],
  selectedSkills: number[],
): boolean => {
  return userSkills.some((skill) => selectedSkills.includes(skill.id));
};

export const selectFilteredUsers = createSelector(
  [selectAllUsers, selectFilters],
  (users, filters) => {
    if (users.length === 0) return [];

    return users.filter((user) => {
      if (filters.userGender !== 'any') {
        const genderMatch =
          filters.userGender === 'male'
            ? user.gender === 'Мужской'
            : user.gender === 'Женский';
        if (!genderMatch) return false;
      }

      if (filters.cities.length > 0) {
        if (!filters.cities.includes(user.location)) return false;
      }

      // Фильтр по типу взаимодействия и навыкам
      if (filters.interactionType !== 'all' || filters.skillsID.length > 0) {
        let matchesInteraction = false;

        // Проверяем "Могу научить"
        const canTeachMatch =
          filters.interactionType === 'canTeach' ||
          filters.interactionType === 'all';
        if (canTeachMatch) {
          const hasMatchingTeachSkills =
            filters.skillsID.length > 0
              ? hasMatchingSkills(user.skillCanTeach, filters.skillsID)
              : user.skillCanTeach.length > 0;

          matchesInteraction = matchesInteraction || hasMatchingTeachSkills;
        }

        // Проверяем "Хочу научиться"
        const wantLearnMatch =
          filters.interactionType === 'wantToLearn' ||
          filters.interactionType === 'all';
        if (wantLearnMatch && !matchesInteraction) {
          const hasMatchingLearnSkills =
            filters.skillsID.length > 0
              ? hasMatchingSkills(
                  user.subcategoriesWantToLearn,
                  filters.skillsID,
                )
              : user.subcategoriesWantToLearn.length > 0;

          matchesInteraction = matchesInteraction || hasMatchingLearnSkills;
        }

        if (!matchesInteraction) return false;
      }

      return true;
    });
  },
);

export const selectUniqueCities = createSelector([selectAllUsers], (users) => {
  const cities = users.map((user) => user.location);
  return Array.from(new Set(cities)).sort();
});

export const selectAllUniqueSkills = createSelector(
  [selectAllUsers],
  (users) => {
    const allSkills: Subcategory[] = [];

    users.forEach((user) => {
      user.skillCanTeach.forEach((skill) => {
        if (!allSkills.some((s) => s.id === skill.id)) {
          allSkills.push(skill);
        }
      });

      user.subcategoriesWantToLearn.forEach((skill) => {
        if (!allSkills.some((s) => s.id === skill.id)) {
          allSkills.push(skill);
        }
      });
    });

    return allSkills.sort((a, b) => a.name.localeCompare(b.name));
  },
);

export const selectSkillsBySearchBar = createSelector(
  [selectAllUniqueSkills, (_, searchTerm: string) => searchTerm],
  (skills, searchTerm) => {
    if (!searchTerm.trim()) {
      return [];
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return skills.filter((skill) =>
      skill.name.toLowerCase().includes(lowerCaseSearchTerm),
    );
  },
);

export const {
  setUsers,
  setLoading,
  setError,
  updateActivityType,
  updateSkills,
  updateAuthorGender,
  updateCities,
  resetFilters,
  applyFilters,
} = usersFilterSlice.actions;

export const filterReducer = usersFilterSlice.reducer;
