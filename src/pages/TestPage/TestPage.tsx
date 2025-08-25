import { useState, useEffect } from 'react';
import viteLogo from '/vite.svg';
import './TestPage.css';
import {
  getUsersApi,
  registerUserApi,
  loginApi,
  offerSwapApi,
  getOffersByEmailApi,
} from '../../api';
import type { RegisterUserData, LoginData, SwapOffer } from '../../api/types';

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
      // 1. Регистрация
      const registerData: RegisterUserData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Тест Пользователь',
        birthday: '1990-01-01',
        gender: 'Мужской',
        location: 'Москва',
        skillCanTeach: [{ id: 1011, name: 'Управление командой' }],
        subcategoriesWantToLearn: [{ id: 1031, name: 'Английский' }],
      };

      const registerResult = await registerUserApi(registerData);
      console.log(
        'Регистрация:',
        registerResult.success ? 'Успех' : 'Ошибка:',
        registerResult.message,
      );

      // 2. Логин
      const loginData: LoginData = {
        email: 'test@example.com',
        password: 'password123',
      };

      const loginResult = await loginApi(loginData);
      console.log(
        'Логин:',
        loginResult.success ? 'Успех' : 'Ошибка:',
        loginResult.message,
      );
      if (loginResult.success) {
        console.log('Данные пользователя:', loginResult.data);
      }

      // 3. Предложить обмен
      const swapOffer: SwapOffer = {
        targetUserId: 1,
        skillToTeach: { id: 1011, name: 'Управление командой' },
        skillToLearn: { id: 1031, name: 'Английский' },
        currentUserEmail: 'test@example.com',
      };

      const offerResult = await offerSwapApi(swapOffer);
      console.log(
        'Предложение обмена:',
        offerResult.success ? 'Успех' : 'Ошибка:',
        offerResult.message,
      );

      // 4. Получить всех пользователей(только мок, из файла, не из localStorage)
      const users = await getUsersApi();
      console.log('Все пользователи:', users);

      // 5. Показать предложения привязанные к текущему email
      const offers = await getOffersByEmailApi('test@example.com');
      console.log('Предложения обмена:', offers);
    } catch (error) {
      console.error('Ошибка при тестировании API:', getErrorMessage(error));
    }
  };

  const handleTestClick = () => {
    testAllApis();
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

        <button onClick={handleTestClick} style={{ marginTop: '20px' }}>
          Запустить тесты API
        </button>

        <p style={{ marginTop: '20px' }}>
          Откройте консоль (F12) для просмотра результатов тестов
        </p>
      </div>
    </>
  );
};
