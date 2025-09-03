import { configureStore } from "@reduxjs/toolkit";
import type { LoginData, RegisterUserData, User } from '../../src/api/types';
import { authReducer, clearError, init, initialState, LOCAL_STORAGE_SWAP_USERS_ALIAS, loginUser, logout, logoutUser, registerUser, updateUser } from "../../src/services/authSlice/authSlice";
import { registerUserApi, loginApi, updateUserApi, logoutApi } from "../../src/api";

jest.mock('../../src/api/mockApi', () => ({
  registerUserApi: jest.fn(),
  loginApi: jest.fn(),
  updateUserApi: jest.fn(),
  logoutApi: jest.fn()
}));

jest.mock('../../src/shared/utils/setCookie', () => ({
      setCookie: jest.fn(),
      getCookie: jest.fn(() => 'test access'),
      deleteCookie: jest.fn()
}));

beforeEach(() => {
      jest.clearAllMocks();
});

describe('Тестировани слайса auth', () => {
      const testRegisterUser: RegisterUserData = {
            email: "test@email.com",
            password: "test",
            name: "test",
            gender: "test",
            birthDate: null,
            location: "test",
            skillImages: [],
            skillCanTeach: [{id: 1, name: "test1"}],
            subcategoriesWantToLearn: [{id: 2, name: "test2"}]
      }

      const testUser: User = {
            ...testRegisterUser,
            id: 1,
            accessToken: '',
            isAuth: false,
      }

      const initalUserAuth: User = {
            ...testUser,
            isAuth: true, 
            accessToken: 'test token'
      }

      const requestLoginUserData: LoginData = {
            email: "test",
            password: "test"
      }
      
      const errorMessage = 'Test error message';

      test('register user fulfilled', async () => {
            const responseData: User = {
                  ...testUser,
                  isAuth: true, 
                  accessToken: 'test token'
            };

            ;(registerUserApi as jest.Mock).mockResolvedValue({     
                  success: true,
                  data: responseData,
                  message: 'Пользователь успешно зарегистрирован'
            });

            const store = configureStore({
                  reducer: { 
                        auth: authReducer,
                  },
            })

            await store.dispatch(registerUser(testRegisterUser));
            
            const authState = store.getState().auth;

            expect(authState.isInit).toBe(true);
            expect(authState.isLoading).toBe(false);
            expect(authState.isLoggedIn).toBe(true);
            expect(authState.error).toBe(null);
            expect(authState.user).toEqual(responseData);
      });

      test('register user rejected', async () => {
            
            ;(registerUserApi as jest.Mock).mockRejectedValue(new Error(errorMessage));

            const store = configureStore({
                  reducer: { 
                        auth: authReducer,
                  },
            });

            await store.dispatch(registerUser(testRegisterUser));
            
            const authState = store.getState().auth;

            expect(authState.isInit).toBe(false);
            expect(authState.isLoading).toBe(false);
            expect(authState.isLoggedIn).toBe(false);
            expect(authState.error).toBe(errorMessage);
            expect(authState.user).toBe(null);
      });

      test('login user fulfilled', async () => {
            const responseData: User = testUser;
            localStorage.setItem(LOCAL_STORAGE_SWAP_USERS_ALIAS, JSON.stringify([responseData])); 

            ;(loginApi as jest.Mock).mockResolvedValue({
                  success: true,
                  data: responseData,
                  message: 'Пользователь успешно аутентифицирован'
            });

            const store = configureStore({
                  reducer: { 
                        auth: authReducer,
                  },
            })

            await store.dispatch(loginUser(requestLoginUserData));
            
            const authState = store.getState().auth;

            expect(authState.isInit).toBe(true);
            expect(authState.isLoading).toBe(false);
            expect(authState.isLoggedIn).toBe(true);
            expect(authState.error).toBe(null);
            expect(authState.user).toBe(responseData);

            const users: User[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SWAP_USERS_ALIAS) ?? '') ?? [];
            const user = users.find(el => el.id === responseData.id);
            expect(user?.isAuth).toBe(true);
      });

      test('login user rejected', async () => {
            ;(loginApi as jest.Mock).mockRejectedValue(new Error(errorMessage));

            const store = configureStore({
                  reducer: { 
                        auth: authReducer,
                  },
            });

            await store.dispatch(loginUser(requestLoginUserData));
            
            const authState = store.getState().auth;

            expect(authState.isInit).toBe(false);
            expect(authState.isLoading).toBe(false);
            expect(authState.isLoggedIn).toBe(false);
            expect(authState.error).toBe(errorMessage);
            expect(authState.user).toBe(null);
      });

      test('update user fulfilled', async () => {
            const updatedFields: Partial<User> = {
                  name: 'test update',
            }
            const initalUser: User = {
                  ...testUser,
                  isAuth: true, 
                  accessToken: 'test token'
            }
            const responseData: User = {
                  ...initalUser,
                  ...updatedFields
            };

            ;(updateUserApi as jest.Mock).mockResolvedValue({
                  success: true,
                  data: responseData,
                  message: 'Пользователь успешно обновлен'
            });

            const store = configureStore({
                  reducer: { 
                        auth: authReducer,
                  },
                  preloadedState: {
                  auth: {
                        ...initialState,
                        user: initalUserAuth,
                        isLoggedIn: true
                  },
            }});

            await store.dispatch(updateUser(updatedFields));
            
            const authState = store.getState().auth;

            expect(authState.isLoading).toBe(false);
            expect(authState.isLoggedIn).toBe(true);
            expect(authState.error).toBe(null);
            expect(authState.user).toBe(responseData);
      });

      test('update user rejected', async () => {
            const updatedFields: Partial<User> = {
                  name: 'test update',
            }

            ;(updateUserApi as jest.Mock).mockRejectedValue(new Error(errorMessage));

            const store = configureStore({
                  reducer: { 
                        auth: authReducer,
                  },
                  preloadedState: {
                  auth: {
                        ...initialState,
                        user: initalUserAuth,
                        isLoggedIn: true
                  },
            }});

            await store.dispatch(updateUser(updatedFields));
            
            const authState = store.getState().auth;

            expect(authState.isLoading).toBe(false);
            expect(authState.isLoggedIn).toBe(true);
            expect(authState.error).toBe(errorMessage);
            expect(authState.user).toBe(initalUserAuth);
      });

      test('logout user fulfilled', async () => {

            localStorage.setItem(LOCAL_STORAGE_SWAP_USERS_ALIAS, JSON.stringify([initalUserAuth])); 

            ;(logoutApi as jest.Mock).mockResolvedValue({
                  success: true,
                  message: 'Пользователь успешно разлогинен'});

            const store = configureStore({
                  reducer: { 
                        auth: authReducer,
                  },
                  preloadedState: {
                  auth: {
                        ...initialState,
                        user: initalUserAuth,
                        isLoggedIn: true
                  },
            }});

            await store.dispatch(logoutUser());
            const authState = store.getState().auth;

            expect(authState.isLoading).toBe(false);
            expect(authState.isLoggedIn).toBe(false);
            expect(authState.error).toBe(null);
            expect(authState.user).toBe(null);

            const users: User[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SWAP_USERS_ALIAS) ?? '') ?? [];
            const user = users.find(el => el.id === initalUserAuth.id);
            expect(user?.isAuth).toBe(false);
      });

      test('login user rejected', async () => {

            ;(logoutApi as jest.Mock).mockRejectedValue(new Error(errorMessage));

            const store = configureStore({
                  reducer: { 
                        auth: authReducer,
                  },
                  preloadedState: {
                  auth: {
                        ...initialState,
                        user: initalUserAuth,
                        isLoggedIn: true
                  },
            }});

            await store.dispatch(logoutUser());
            
            const authState = store.getState().auth;

            expect(authState.isLoading).toBe(false);
            expect(authState.isLoggedIn).toBe(true);
            expect(authState.error).toBe(errorMessage);
            expect(authState.user).toBe(initalUserAuth);
      });

      test('clearError', () => {
            const store = configureStore({
                  reducer: { 
                        auth: authReducer,
                  },
                  preloadedState: {
                  auth: {
                        ...initialState,
                        error: errorMessage
                  },
            }});

            store.dispatch(clearError());

            const authState = store.getState().auth;
            expect(authState.error).toBe(null);
      });

      test('clearError', () => {
            const store = configureStore({
                  reducer: { 
                        auth: authReducer,
                  },
                  preloadedState: {
                  auth: {
                        ...initialState,
                        error: errorMessage
                  },
            }});

            store.dispatch(clearError());
            const authState = store.getState().auth;

            expect(authState.error).toBe(null);
      });

      test('init', () => {
            const store = configureStore({
                  reducer: { 
                        auth: authReducer,
                  },
                  preloadedState: {
                  auth: initialState,
            }});

            store.dispatch(init());
            const authState = store.getState().auth;

            expect(authState.isInit).toBe(true);
            expect(authState.isLoggedIn).toBe(document.cookie.includes('accessToken'));
      });

      test('logout', () => {
            const store = configureStore({
                  reducer: { 
                        auth: authReducer,
                  },
                  preloadedState: {
                  auth: {
                        ...initialState,
                        user: initalUserAuth,
                        isLoggedIn: true,
                        isInit: true
                  },
            }});

            store.dispatch(logout());
            const authState = store.getState().auth;

            expect(authState.isLoading).toBe(false);
            expect(authState.isLoggedIn).toBe(false);
            expect(authState.error).toBe(null);
            expect(authState.user).toBe(null);

      });
})
