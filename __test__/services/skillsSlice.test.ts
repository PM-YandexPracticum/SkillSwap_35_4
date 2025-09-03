import { configureStore } from '@reduxjs/toolkit';
import { skillsReducer, addSkill, removeSkill, type SkillsState } from '../../src/services/skillsSlice/skillsSlice';

describe('skillsSlice', () => {
  test('должен вернуть initial state', () => {
    expect(skillsReducer(undefined, { type: '' })).toEqual([
      {
        skillCanTeach: { id: 0, name: '' },
        description: '',
        uid: 0,
      },
    ]);
  });

  test('addSkill', () => {
    const store = configureStore({ reducer: { skills: skillsReducer } });

    const skill = { id: 1, name: 'test name', description: 'test description' };
    store.dispatch(addSkill(skill));

    const state = store.getState().skills;
    expect(state).toHaveLength(2);

    const item: SkillsState[] = JSON.parse(localStorage.getItem('userSkills') ?? '');
    expect(item).toHaveLength(2);
  });

  test('removeSkill', () => { // не работает по тесту
    const start = [
        { skillCanTeach: { id: 1, name: 'test1 name' }, description: 'test1 description', uid: 123 },
        { skillCanTeach: { id: 2, name: 'test2 name' }, description: 'test2 description', uid: 456 },
    ];

    const state = skillsReducer(start, removeSkill(123));

    expect(state).toHaveLength(1);
    expect(state[0].uid).toBe(456);
    
    const item: SkillsState[] = JSON.parse(localStorage.getItem('userSkills') ?? '');
    expect(item).toHaveLength(1);
  });
});
