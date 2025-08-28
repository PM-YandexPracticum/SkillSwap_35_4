import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Subcategory } from "../../api/types";

type SkillsState = {
  skillCanTeach: Subcategory[];
};

const initialUsersSkillsState: SkillsState = {
  skillCanTeach: [],
};

export const skillsSlice = createSlice({
  name: 'skills',
  initialState: initialUsersSkillsState,
  reducers: {
    addSkill: (state, action: PayloadAction<Subcategory>) => {
      state.skillCanTeach.push(action.payload);
      localStorage.setItem('userSkills', JSON.stringify(state.skillCanTeach));
    },
    removeSkill: (state, action: PayloadAction<number>) => {
      state.skillCanTeach = state.skillCanTeach.filter(skill => skill.id !== action.payload);
      localStorage.setItem('userSkills', JSON.stringify(state.skillCanTeach));
    },
  },
});

export const { addSkill, removeSkill } = skillsSlice.actions;

export const skillsReducer = skillsSlice.reducer;