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

// 1. Получить всех мок пользователей
export const getUsersApi = (): Promise<mockUser[]> =>
  createMockRequest([...(mockData.users as mockUser[])], 300).then(
    checkResponse,
  );

// 2. Предложить обмен
export const offerSwapApi = (
  offer: SwapOffer,
): Promise<ApiResponse<SwapOffer>> =>
  createMockRequest({}, 400).then(() => {
    // Получаем текущие предложения
    const storedOffers = localStorage.getItem(SWAP_OFFERS_KEY);
    const offers: SwapOffer[] = storedOffers ? JSON.parse(storedOffers) : [];

    // Добавляем новое предложение
    offers.push(offer);

    // Сохраняем обратно
    localStorage.setItem(SWAP_OFFERS_KEY, JSON.stringify(offers));

    return {
      success: true,
      data: offer,
      message: 'Предложение обмена сохранено',
    };
  });

// 3. Регистрация пользователя
export const registerUserApi = (
  userData: RegisterUserData,
): Promise<ApiResponse<User>> =>
  createMockRequest({}, 500)
    .then(() => {
      // Валидация обязательных полей
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

      // Создаем нового пользователя
      const newUser: User = {
        id: Date.now(), // Используем время как уникальный ID
        ...userData,
      };

      // Добавляем и сохраняем
      existingUsers.push(newUser);
      saveUsersToStorage(existingUsers);

      return {
        success: true,
        data: newUser,
        message: 'Пользователь успешно зарегистрирован',
      };
    })
    .catch((error) => ({
      success: false,
      message: error.message,
    }));

// 4. Аутентификация пользователя
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

      // Возвращаем пользователя без пароля
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
