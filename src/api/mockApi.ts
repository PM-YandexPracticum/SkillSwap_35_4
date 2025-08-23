import mockData from './mok.json';
import type {
  User,
  FiltersData,
  LoginData,
  UserFilters,
  Subcategory,
} from './types';
import { createMockRequest, checkResponse, parseAge } from './utils';

// Users API
export const getUsersApi = (): Promise<User[]> =>
  createMockRequest(mockData.users as User[], 300).then(checkResponse);

export const getUserByIdApi = (id: number): Promise<User> =>
  createMockRequest(mockData.users as User[], 200)
    .then(checkResponse)
    .then((users) => {
      const user = users.find((u) => u.id === id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    });

export const loginApi = (credentials: LoginData): Promise<User> =>
  createMockRequest(mockData.users as User[], 300)
    .then(checkResponse)
    .then((users) => {
      const user = users.find(
        (u) =>
          u.login === credentials.login && u.password === credentials.password,
      );

      if (!user) {
        throw new Error('Invalid credentials');
      }
      return user;
    });

// Filters API
export const getFiltersApi = (): Promise<FiltersData> =>
  createMockRequest(mockData.filters as FiltersData, 150).then(checkResponse);

// User filtering with multiple criteria
export const getUsersByFilterApi = (
  filters: UserFilters = {},
): Promise<User[]> =>
  createMockRequest(mockData.users as User[], 300)
    .then(checkResponse)
    .then((users) => {
      let filteredUsers = [...users];

      // Фильтр по городам
      if (filters.cityIds && filters.cityIds.length > 0) {
        const cityNames = mockData.filters.cities
          .filter((city) => filters.cityIds!.includes(city.id))
          .map((city) => city.name);

        filteredUsers = filteredUsers.filter((user) =>
          cityNames.some((cityName) => user.location.includes(cityName)),
        );
      }

      // Фильтр по полу
      if (filters.genderIds && filters.genderIds.length > 0) {
        const genderNames = mockData.filters.genders
          .filter((gender) => filters.genderIds!.includes(gender.id))
          .map((gender) => gender.name);

        filteredUsers = filteredUsers.filter((user) =>
          genderNames.includes(user.gender),
        );
      }
      // Фильтр по возрасту
      if (filters.ageRange) {
        const [minAge, maxAge] = filters.ageRange;
        filteredUsers = filteredUsers.filter((user) => {
          const age = parseAge(user.age);
          return age >= minAge && age <= maxAge;
        });
      }
      // Фильтр по навыкам
      const hasSkillFilter = filters.skillIds && filters.skillIds.length > 0;
      const hasSubcategoryFilter =
        filters.subcategoryIds && filters.subcategoryIds.length > 0;

      if (hasSkillFilter || hasSubcategoryFilter) {
        const checkSkill = (skill: Subcategory) => {
          if (hasSkillFilter && filters.skillIds!.includes(skill.id))
            return true;
          if (
            hasSubcategoryFilter &&
            filters.subcategoryIds!.includes(skill.id)
          )
            return true;
          return false;
        };

        switch (filters.learningType) {
          case 'teach':
            // Только те, кто МОЖЕТ научить выбранным навыкам
            filteredUsers = filteredUsers.filter((user) =>
              user.skillCanTeach.some(checkSkill),
            );
            break;

          case 'learn':
            // Только те, кто ХОЧЕТ научиться выбранным навыкам
            filteredUsers = filteredUsers.filter((user) =>
              user.subcategoriesWantToLearn.some(checkSkill),
            );
            break;

          default:
            // both или не указано: те, кто МОЖЕТ научить ИЛИ ХОЧЕТ научиться
            filteredUsers = filteredUsers.filter(
              (user) =>
                user.skillCanTeach.some(checkSkill) ||
                user.subcategoriesWantToLearn.some(checkSkill),
            );
            break;
        }
      }
      return filteredUsers;
    });

// Search users by location
export const getUsersByLocationApi = (location: string): Promise<User[]> =>
  createMockRequest(mockData.users as User[], 300)
    .then(checkResponse)
    .then((users) =>
      users.filter((user) =>
        user.location.toLowerCase().includes(location.toLowerCase()),
      ),
    );

// Search users by skills
export const searchUsersBySkillsApi = (skillIds: number[]): Promise<User[]> =>
  createMockRequest(mockData.users as User[], 400)
    .then(checkResponse)
    .then((users) =>
      users.filter(
        (user) =>
          user.skillCanTeach.some((skill) => skillIds.includes(skill.id)) ||
          user.subcategoriesWantToLearn.some((skill) =>
            skillIds.includes(skill.id),
          ),
      ),
    );

// Get skill by ID
export const getSkillByIdApi = (skillId: number): Promise<Subcategory> =>
  createMockRequest(mockData.filters as FiltersData, 200)
    .then(checkResponse)
    .then((filters) => {
      for (const category of filters.skills) {
        const skill = category.subcategories.find((s) => s.id === skillId);
        if (skill) return skill;
      }
      throw new Error('Skill not found');
    });

// Get user by login
export const getUserByLoginApi = (login: string): Promise<User> =>
  createMockRequest(mockData.users as User[], 250)
    .then(checkResponse)
    .then((users) => {
      const user = users.find((u) => u.login === login);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    });
