import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  registerUserApi,
  loginApi,
  updateUserApi,
  logoutApi,
} from '../../api/mockApi';
import type { LoginData, RegisterUserData, User } from '../../api/types';
import { setCookie } from '../../shared/utils/setCookie';
// import { RootState } from '../store';

export interface AuthState {
  isInit: boolean;
  isLoading: boolean;
  user: User | null;
  error: string | null;
  isLoggedIn: boolean;
}

export const initialState: AuthState = {
  isInit: false,
  isLoading: false,
  user: null,
  error: null,
  isLoggedIn: false,
};

export const LOCAL_STORAGE_SWAP_USERS_ALIAS = 'swap_users'; // Название переменной в localStorage поместил в отдельную переменную чтобы тесты не падали при её изменении
// регистрация пользователя
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: RegisterUserData, { rejectWithValue }) => {
    try {
      const response = await registerUserApi(userData);
      if (!response.success) {
        throw new Error(response.message);
      }

      if (response.data?.accessToken) {
        setCookie('accessToken', response.data.accessToken);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Ошибка регистрации',
      );
    }
  },
);

//вход
export const loginUser = createAsyncThunk(
  'auth/login',
  async (loginData: LoginData, { rejectWithValue }) => {
    try {
      const response = await loginApi(loginData);
      if (!response.success) {
        throw new Error(response.message);
      }

      if (response.data?.accessToken) {
        setCookie('accessToken', response.data.accessToken);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Ошибка входа',
      );
    }
  },
);

// Обновление данных пользователя
export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (
    updates: Partial<Omit<User, 'id' | 'isAuth' | 'accessToken'>>,
    { rejectWithValue, getState },
  ) => {
    try {
      const state = getState() as { auth: AuthState };
      const currentUser = state.auth.user;

      if (!currentUser || !currentUser.accessToken) {
        throw new Error('Пользователь не авторизован');
      }

      const response = await updateUserApi(
        currentUser.email,
        currentUser.accessToken,
        updates,
      );
      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Ошибка обновления данных',
      );
    }
  },
);

//выход
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: AuthState };
      const user = state.auth.user;
      if (user && user.accessToken) {
        const response = await logoutApi(user.email, user.accessToken);
        if (!response.success) {
          throw new Error(response.message);
        }
      }
      document.cookie = 'accessToken=; Max-Age=0; path=/;';
      return null;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Ошибка выхода',
      );
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    init: (state) => {
      const hasToken = document.cookie.includes('accessToken');
      state.isLoggedIn = !!hasToken;
      state.isInit = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.isLoading = false;
      state.error = null;
      document.cookie = 'accessToken=; Max-Age=0; path=/;';
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // вход
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.user = action.payload ?? null;
      state.error = null;
      state.isInit = true;
      if (action.payload) {
        try {
          const storedUsers = localStorage.getItem(LOCAL_STORAGE_SWAP_USERS_ALIAS);
          const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];
          const userIndex = users.findIndex((u) => u.id === action.payload!.id);

          if (userIndex !== -1) {
            users[userIndex] = { ...users[userIndex], isAuth: true };
            localStorage.setItem(LOCAL_STORAGE_SWAP_USERS_ALIAS, JSON.stringify(users));
          }
        } catch (error) {
          console.error('Error updating user in localStorage:', error);
        }
      }
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.error = action.payload as string;
    });

    // выход
    builder.addCase(logoutUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.isLoading = false;
      state.user = null;
      state.error = null;
      state.isLoggedIn = false;

      try {
        const storedUsers = localStorage.getItem(LOCAL_STORAGE_SWAP_USERS_ALIAS);
        if (storedUsers) {
          const users: User[] = JSON.parse(storedUsers);
          const updatedUsers = users.map((user) => ({
            ...user,
            isAuth: false,
          }));
          localStorage.setItem(LOCAL_STORAGE_SWAP_USERS_ALIAS, JSON.stringify(updatedUsers));
        }
      } catch (error) {
        console.error('Error updating localStorage on logout:', error);
      }
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // регистрация
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.user = action.payload ?? null;
      state.error = null;
      state.isInit = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.error = action.payload as string;
    });

    // обновление пользователя
    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload ?? null;
    });
  },
});

export const { init, logout, clearError } = authSlice.actions;
export const authReducer = authSlice.reducer;
