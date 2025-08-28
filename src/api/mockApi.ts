import { createMockRequest, checkResponse } from './utils';
import mockData from './mok.json';

import type {
  User,
  LoginData,
  RegisterUserData,
  SwapOffer,
  ApiResponse,
  OfferResponse,
  mockUser,
} from './types';

// Ключи для LocalStorage
const USERS_STORAGE_KEY = 'swap_users';
const SWAP_OFFERS_KEY = 'swap_offers';

// Получаем пользователей из LocalStorage
const getUsersFromStorage = (): User[] => {
  try {
    const stored = localStorage.getItem(USERS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// Сохраняем пользователей в LocalStorage
const saveUsersToStorage = (users: User[]) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

// Получить всех мок пользователей из json
export const getUsersApi = (): Promise<mockUser[]> =>
  createMockRequest([...(mockData.users as mockUser[])], 300).then(
    checkResponse,
  );

// Предложить обмен наыками
export const offerSwapApi = (
  offer: SwapOffer,
): Promise<ApiResponse<SwapOffer>> =>
  createMockRequest({}, 400).then(() => {
    const storedOffers = localStorage.getItem(SWAP_OFFERS_KEY);
    const offers: SwapOffer[] = storedOffers ? JSON.parse(storedOffers) : [];

    // Ищем существующее предложение от этого пользователя к этому targetUserId
    const existingOfferIndex = offers.findIndex(
      (o) =>
        o.currentUserEmail === offer.currentUserEmail &&
        o.targetUserId === offer.targetUserId,
    );

    if (existingOfferIndex !== -1) {
      const existingOffer = offers[existingOfferIndex];

      // Проверяем, отличается ли новое предложение
      const isSameOffer =
        existingOffer.skillToTeach.id === offer.skillToTeach.id &&
        existingOffer.skillToLearn.id === offer.skillToLearn.id;

      if (isSameOffer) {
        return {
          success: false,
          message: 'Такое предложение уже имеется',
        };
      } else {
        offers[existingOfferIndex] = offer;
        localStorage.setItem(SWAP_OFFERS_KEY, JSON.stringify(offers));

        return {
          success: true,
          data: offer,
          message: 'Предложение обмена обновлено',
        };
      }
    }
    offers.push(offer);
    localStorage.setItem(SWAP_OFFERS_KEY, JSON.stringify(offers));

    return {
      success: true,
      data: offer,
      message: 'Предложение обмена сохранено',
    };
  });

export const registerUserApi = (
  userData: RegisterUserData,
): Promise<ApiResponse<User>> =>
  createMockRequest({}, 500)
    .then(() => {
      const requiredFields: (keyof RegisterUserData)[] = [
        'email',
        'password',
        'name',
        'birthday',
        'gender',
        'location',
        'skillCanTeach',
        'subcategoriesWantToLearn',
      ];

      for (const field of requiredFields) {
        if (!userData[field]) {
          throw new Error(`Поле ${field} обязательно для заполнения`);
        }
      }

      // Проверяем email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userData.email)) {
        throw new Error('Некорректный email');
      }

      const existingUsers = getUsersFromStorage();

      // Проверка уникальности email
      const emailExists = existingUsers.some((u) => u.email === userData.email);
      if (emailExists) {
        throw new Error('Пользователь с таким email уже существует');
      }

      // Создаем нового пользователя с isAuth и accessToken
      const newUser: User = {
        id: Date.now(),
        ...userData,
        isAuth: true,
        accessToken: 'token123',
      };

      // Добавляем и сохраняем
      existingUsers.push(newUser);
      saveUsersToStorage(existingUsers);

      // Возвращаем пользователя без пароля, но с isAuth и accessToken
      const { password, ...userWithoutPassword } = newUser;

      return {
        success: true,
        data: userWithoutPassword as User,
        message: 'Пользователь успешно зарегистрирован',
      };
    })
    .catch((error) => ({
      success: false,
      message: error.message,
    }));

// Аутентификация пользователя
export const loginApi = (credentials: LoginData): Promise<ApiResponse<User>> =>
  createMockRequest({}, 300)
    .then(() => {
      const users = getUsersFromStorage();
      const user = users.find(
        (u) =>
          u.email === credentials.email && u.password === credentials.password,
      );

      if (!user) {
        throw new Error('Неверный email или пароль');
      }

      // Обновляем статус аутентификации и токен
      user.isAuth = true;
      user.accessToken = 'token123';

      // Сохраняем обновленного пользователя
      const userIndex = users.findIndex((u) => u.id === user.id);
      if (userIndex !== -1) {
        users[userIndex] = user;
        saveUsersToStorage(users);
      }

      // Возвращаем пользователя без пароля, но с isAuth и accessToken
      const { password, ...userWithoutPassword } = user;

      return {
        success: true,
        data: userWithoutPassword as User,
        message: 'Вход выполнен успешно',
      };
    })
    .catch((error) => ({
      success: false,
      message: error.message,
    }));

// Выход из системы
export const logoutApi = (
  email: string,
  accessToken: string,
): Promise<ApiResponse<void>> =>
  createMockRequest({}, 200)
    .then(() => {
      const users = getUsersFromStorage();
      const user = users.find((u) => u.email === email);

      // Проверяем существование пользователя
      if (!user) {
        throw new Error('Пользователь с таким email не найден');
      }

      // Проверяем авторизацию
      if (!user.isAuth) {
        throw new Error('Пользователь не авторизован');
      }

      // Проверяем токен
      if (user.accessToken !== accessToken) {
        throw new Error('Неверный токен');
      }

      // Меняем статус аутентификации
      user.isAuth = false;

      // Сохраняем изменения
      const userIndex = users.findIndex((u) => u.id === user.id);
      if (userIndex !== -1) {
        users[userIndex] = user;
        saveUsersToStorage(users);
      }

      return {
        success: true,
        message: 'Выход выполнен успешно',
      };
    })
    .catch((error) => ({
      success: false,
      message: error.message,
    }));

// Обновление данных пользователя
export const updateUserApi = (
  email: string,
  accessToken: string,
  updates: Partial<Omit<User, 'id' | 'isAuth' | 'accessToken'>>,
): Promise<ApiResponse<User>> =>
  createMockRequest({}, 400)
    .then(() => {
      const users = getUsersFromStorage();
      const user = users.find((u) => u.email === email);

      // Проверяем существование пользователя
      if (!user) {
        throw new Error('Пользователь с таким email не найден');
      }

      // Проверяем авторизацию
      if (!user.isAuth) {
        throw new Error('Пользователь не авторизован');
      }

      // Проверяем токен
      if (user.accessToken !== accessToken) {
        throw new Error('Неверный токен');
      }

      // Применяем обновления
      Object.assign(user, updates);

      // Сохраняем изменения
      const userIndex = users.findIndex((u) => u.id === user.id);
      if (userIndex !== -1) {
        users[userIndex] = user;
        saveUsersToStorage(users);
      }

      // Возвращаем пользователя без пароля
      const { password, ...userWithoutPassword } = user;

      return {
        success: true,
        data: userWithoutPassword as User,
        message: 'Данные пользователя обновлены',
      };
    })
    .catch((error) => ({
      success: false,
      message: error.message,
    }));

export const getOffersByEmailApi = (email: string): Promise<OfferResponse[]> =>
  createMockRequest({}, 100).then(() => {
    const stored = localStorage.getItem(SWAP_OFFERS_KEY);
    const allOffers: SwapOffer[] = stored ? JSON.parse(stored) : [];

    // Фильтруем предложения по email и преобразуем в нужный формат
    return allOffers
      .filter((offer) => offer.currentUserEmail === email)
      .map((offer) => ({
        targetUserId: offer.targetUserId,
        skillToLearn: offer.skillToLearn,
        skillToTeach: offer.skillToTeach,
      }));
  });
