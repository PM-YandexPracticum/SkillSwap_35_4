import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { OfferResponse, SwapOffer, User } from '../../api/types';
import {
  getOffersByEmailApi,
  offerSwapApi,
  getUsersFromStorage,
} from '../../api/mockApi';

interface UsersState {
  usersData: User[];
  userData: User | null;
  offers: SwapOffer[];
  isLoading: boolean;
  error: string | null;
}

export const initialState: UsersState = {
  usersData: [],
  userData: null,
  offers: [],
  isLoading: false,
  error: null,
};

export const getUsers = createAsyncThunk('users/getUsers', async () =>
  getUsersFromStorage(),
);

export const getUserById = createAsyncThunk(
  'users/getUserById',
  async (id: number) => {
    const users = await getUsersFromStorage();
    const user = users.find((u) => u.id === id);
    return user ?? null;
  },
);

export const sendOffer = createAsyncThunk<SwapOffer, SwapOffer>(
  'users/sendOffer',
  async (offer) => {
    await offerSwapApi(offer); // сохранение в localStorage
    return offer;
  },
);

export const getOffersByEmail = createAsyncThunk<SwapOffer[], string>(
  'users/getOffersByEmail',
  async (email) => {
    const offersApi: OfferResponse[] = await getOffersByEmailApi(email);
    const offers: SwapOffer[] = offersApi.map((offer) => ({
      currentUserEmail: email,
      targetUserId: offer.targetUserId,
      skillToLearn: offer.skillToLearn,
      skillToTeach: offer.skillToTeach,
    }));
    return offers;
  },
);

export const usersSlice = createSlice({
  name: 'usersSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // загрузка пользователей
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.usersData = action.payload;
        state.isLoading = false;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      })
      // загрузка пользователя по id
      .addCase(getUserById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.isLoading = false;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      })
      // отправка запроса на обмен
      .addCase(sendOffer.fulfilled, (state, action) => {
        state.offers.push(action.payload);
      })
      .addCase(sendOffer.rejected, (state, action) => {
        state.error = action.error.message!;
      })
      //получение запроса на обмен по email
      .addCase(getOffersByEmail.fulfilled, (state, action) => {
        state.offers = action.payload;
      })
      .addCase(getOffersByEmail.rejected, (state, action) => {
        state.error = action.error.message!;
      });
  },
  selectors: {
    selectUsers: (state) => state.usersData,
    selectUser: (state) => state.userData,
    selectOffers: (state) => state.offers,
    selectIsLoading: (state) => state.isLoading,
    selectError: (state) => state.error,
  },
});

export const {
  selectUsers,
  selectUser,
  selectOffers,
  selectIsLoading,
  selectError,
} = usersSlice.selectors;

export const usersReducer = usersSlice.reducer;
