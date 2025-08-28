import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  registerUserApi,
  loginApi,
  // updateUserApi,
  // logoutApi,
  // refreshToken
} from '../../api/mockApi';
import type { LoginData, RegisterUserData, User } from '../../api/types';
import { setCookie } from '../../shared/utils/cookie';
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

// регистрация
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: RegisterUserData, { rejectWithValue }) => {
    try {
      const response = await registerUserApi(userData);
      // setCookie('accessToken', response.accessToken);
      // localStorage.setItem('refreshToken', response.refreshToken);
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
      // setCookie('accessToken', response.accessToken);
      // localStorage.setItem('refreshToken', response.refreshToken);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Ошибка входа',
      );
    }
  },
);

// //получение данных
// export const getUser = createAsyncThunk(
//   'auth/user',
//   async (_, { rejectWithValue, dispatch }) => {
//     try {
//       const response = await getCurrentUserApi();
//       if (!response.success) {
//         throw new Error(response.message);
//       }
//       return response.data;
//     } catch (error) {
//       if ((error as Error).message.includes('не найден') ||
//           (error as Error).message.includes('Ошибка')) {
//         try {
//           const refreshData = await refreshToken();
//           if (!refreshData.success) {
//             throw new Error(refreshData.message);
//           }
//           setCookie('accessToken', refreshData.accessToken);
//           localStorage.setItem('refreshToken', refreshData.refreshToken);

//           // Повторный запрос пользователя
//           const newResponse = await getCurrentUserApi();
//           if (!newResponse.success) {
//             throw new Error(newResponse.message);
//           }
//           return newResponse.data;
//         } catch (refreshError) {
//           dispatch(logout());
//           return rejectWithValue('Сессия истекла. Войдите снова');
//         }
//       }
//       return rejectWithValue(
//         error instanceof Error ? error.message : 'Ошибка получения данных'
//       );
//     }
//   }
// );

// //обновление данных
// export const updateUser = createAsyncThunk(
//   'auth/update',
//   async (
//     userData: { name: string; email: string; password?: string },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await updateUserApi(userData);
//       return response.user;
//     } catch (error) {
//       return rejectWithValue(
//         error instanceof Error ? error.message : 'Ошибка обновления данных'
//       );
//     }
//   }
// );

// //выход
// export const logoutUser = createAsyncThunk(
//   'auth/logout',
//   async (_, { rejectWithValue }) => {
//     try {
//       await logoutApi();
//       localStorage.removeItem('refreshToken');
//       document.cookie = 'accessToken=; Max-Age=0; path=/;';
//       return null;
//     } catch (error) {
//       return rejectWithValue(
//         error instanceof Error ? error.message : 'Ошибка выхода'
//       );
//     }
//   }
// );

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    init: (state) => {
      const hasToken =
        localStorage.getItem('refreshToken') ||
        document.cookie.includes('accessToken');
      state.isLoggedIn = !!hasToken;
      state.isInit = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.isLoading = false;
      state.error = null;
      localStorage.removeItem('refreshToken');
      document.cookie = 'accessToken=; Max-Age=0; path=/;';
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  // extraReducers: (builder) => {
  //   // получение данных
  //   builder.addCase(getUser.pending, (state) => {
  //     state.isLoading = true;
  //     state.error = null;
  //   });
  //   builder.addCase(getUser.rejected, (state, action) => {
  //     state.isLoading = false;
  //     state.isInit = true;
  //     state.isLoggedIn = false;
  //     state.error = action.payload as string;
  //   });
  //   builder.addCase(getUser.fulfilled, (state, action) => {
  //     state.isLoading = false;
  //     state.isInit = true;
  //     state.isLoggedIn = true;
  //     state.user = action.payload;
  //   });

  //   // вход
  //   builder.addCase(loginUser.pending, (state) => {
  //     state.isLoading = true;
  //     state.error = null;
  //   });
  //   builder.addCase(loginUser.fulfilled, (state, action) => {
  //     state.isLoading = false;
  //     state.isLoggedIn = true;
  //     if (action.payload) {
  //       state.user = action.payload;
  //     } else {
  //       state.user = null;
  //     }
  //     state.error = null;
  //   });
  //   builder.addCase(loginUser.rejected, (state, action) => {
  //     state.isLoading = false;
  //     state.isLoggedIn = false;
  //     state.error = action.payload as string;
  //   });

  //   // выход
  //   builder.addCase(logoutUser.pending, (state) => {
  //     state.isLoading = true;
  //     state.error = null;
  //   });
  //   builder.addCase(logoutUser.fulfilled, (state) => {
  //     state.isLoading = false;
  //     state.isLoggedIn = false;
  //     state.user = null;
  //     state.error = null;
  //   });
  //   builder.addCase(logoutUser.rejected, (state, action) => {
  //     state.isLoading = false;
  //     state.error = action.payload as string;
  //   });

  //   // регистрация
  //   builder.addCase(registerUser.pending, (state) => {
  //     state.isLoading = true;
  //     state.error = null;
  //   });
  //   builder.addCase(registerUser.fulfilled, (state, action) => {
  //     state.isLoading = false;
  //     state.isLoggedIn = true;
  //     if (action.payload) {
  //       state.user = action.payload;
  //     } else {
  //       state.user = null;
  //     }
  //     state.error = null;
  //     state.isInit = true;
  //   });
  //   builder.addCase(registerUser.rejected, (state, action) => {
  //     state.isLoading = false;
  //     state.isLoggedIn = false;
  //     state.error = action.payload as string;
  //   });

  //   // обновление пользователя
  //   builder.addCase(updateUser.pending, (state) => {
  //     state.isLoading = true;
  //     state.error = null;
  //   });
  //   builder.addCase(updateUser.rejected, (state, action) => {
  //     state.isLoading = false;
  //     state.error = action.payload as string;
  //   });
  //   builder.addCase(updateUser.fulfilled, (state, action) => {
  //     state.isLoading = false;
  //     state.user = action.payload;
  //   });
  // }
});

export const { init, logout, clearError } = authSlice.actions;
export const userReducer = authSlice.reducer;

// Селекторы
// export const selectInit = (state: RootState) => state.user.isInit;
// export const selectUser = (state: RootState) => state.user.user;
// export const selectIsLoggedIn = (state: RootState) => state.user.isLoggedIn;
// export const selectIsLoading = (state: RootState) => state.user.isLoading;
// export const selectError = (state: RootState) => state.user.error;
