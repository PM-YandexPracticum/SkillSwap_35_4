import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Subcategory } from '../../api/types';

export interface SkillsState {
  skillCanTeach: Subcategory;
  //  описание навыка (если пригодится)
  description: string;
  //  уникальный идентификатор для навыка
  uid: number;
}

const initialUsersSkillsState: SkillsState[] = [
  {
    skillCanTeach: { id: 0, name: '' },
    description: '',
    uid: 0,
  },
];

export const skillsSlice = createSlice({
  name: 'skills',
  initialState: initialUsersSkillsState,
  reducers: {
    addSkill: {
      reducer: (state, action: PayloadAction<SkillsState>) => {
        state.push(action.payload);
        localStorage.setItem('userSkills', JSON.stringify(state));
      },
      prepare: (skill: Subcategory & { description: string }) => {
        // создание уникального идентификатора для навыка
        const uid = Date.now();
        return {
          payload: {
            skillCanTeach: { id: skill.id, name: skill.name },
            description: skill.description ? skill.description : '',
            uid,
          },
        };
      },
    },
    removeSkill: (state, action: PayloadAction<number>) => {
      state = state.filter((skill) => skill.uid !== action.payload);
      localStorage.setItem('userSkills', JSON.stringify(state));
      return state; // исправил состояние не мутировалось
    },
  },
});

export const { addSkill, removeSkill } = skillsSlice.actions;

export const skillsReducer = skillsSlice.reducer;
