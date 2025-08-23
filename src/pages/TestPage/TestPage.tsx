import { useState, useEffect } from 'react';
import viteLogo from '/vite.svg';
import './TestPage.css';
import {
  getUsersApi,
  getUserByIdApi,
  loginApi,
  getFiltersApi,
  getUsersByFilterApi,
  getUsersByLocationApi,
  searchUsersBySkillsApi,
  getSkillByIdApi,
  getUserByLoginApi,
} from '../../api';
import type { UserFilters } from '../../api/types';

export const TestPage = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    testAllApis();
  }, []);

  const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
      return error.message;
    }
    return String(error);
  };

  const testAllApis = async () => {
    try {
      // 1. Получение всех пользователей
      const users = await getUsersApi();
      console.log('Все пользователи:', users);
      // 2. Получение пользователя по ID
      const userById = await getUserByIdApi(1);
      console.log('Пользователь с ID 1:', userById);
      // 3. Тест логина (успешный)
      const loggedInUser = await loginApi({
        login: 'user1',
        password: 'password1',
      });
      console.log('Успешный вход:', loggedInUser.name);
      // 4. Тест логина (неуспешный)
      try {
        await loginApi({ login: 'user1', password: 'wrongpassword' });
      } catch (error) {
        console.log('Ожидаемая ошибка входа:', getErrorMessage(error));
      }
      // 5. Получение фильтров
      const filters = await getFiltersApi();
      console.log('Фильтры:', filters);
      // 6. Фильтрация пользователей
      const filterParams: UserFilters = {
        cityIds: [201, 202], // Москва и СПб
        genderIds: [1], // Мужской
        skillIds: [1011], // Управление командой
        ageRange: [25, 40] as [number, number],
      };
      const filteredUsers = await getUsersByFilterApi(filterParams);
      console.log('Отфильтрованные пользователи:', filteredUsers);
      // 7. Поиск по локации
      const usersInMoscow = await getUsersByLocationApi('Москва');
      console.log('Пользователи в Москве:', usersInMoscow);
      // 8. Поиск по навыкам
      const englishTeachers = await searchUsersBySkillsApi([1031]);
      console.log('Преподаватели английского:', englishTeachers);
      // 9. Получение навыка по ID
      const skill = await getSkillByIdApi(1011);
      console.log('Навык 1011 Управление командой:', skill);
      // 10. Получение пользователя по логину
      const userByLogin = await getUserByLoginApi('user2');
      console.log('Пользователь user2:', userByLogin);
      // 12. Тест несуществующего пользователя
      try {
        await getUserByIdApi(999);
      } catch (error) {
        console.log(
          'Ожидаемая ошибка (пользователь не найден):',
          getErrorMessage(error),
        );
      }
      // 13. Тест несуществующего навыка
      try {
        await getSkillByIdApi(9999);
      } catch (error) {
        console.log(
          'Ожидаемая ошибка (навык не найден):',
          getErrorMessage(error),
        );
      }
    } catch (error) {
      console.error('Ошибка при тестировании API:', getErrorMessage(error));
    }
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Тестовая страница API</h1>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
};
