import type { ApiResponse } from './types';

// Имитация задержки сети
const delay = (ms: number = 300): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Универсальная проверка ответа
export const checkResponse = <T>(res: ApiResponse<T>): Promise<T> =>
  res.success
    ? Promise.resolve(res.data)
    : Promise.reject(new Error(res.message || 'Request failed'));

// Базовый обработчик запросов
export const createMockRequest = async <T>(
  data: T,
  delayMs: number = 300,
): Promise<ApiResponse<T>> => {
  await delay(delayMs);
  return {
    success: true,
    data: data,
  };
};

// Парсинг возраста из строки "34 года", "28 лет" и т.д.
export const parseAge = (ageString: string): number => {
  const match = ageString.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
};
