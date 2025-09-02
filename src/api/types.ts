export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  birthday: string;
  gender: string;
  location: string;
  skillCanTeach: Subcategory[];
  subcategoriesWantToLearn: Subcategory[];
  isAuth: boolean;
  avatarUrl?: string;
  description?: string;
}

export interface mockUser {
  id: number;
  login: string;
  password: string;
  avatarUrl: string;
  name: string;
  location: string;
  age: string;
  gender: string;
  skillCanTeach: Subcategory[];
  subcategoriesWantToLearn: Subcategory[];
}

export interface Subcategory {
  id: number;
  name: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterUserData {
  email: string;
  password: string;
  name: string;
  birthday: string;
  gender: string;
  location: string;
  skillCanTeach: Subcategory[];
  subcategoriesWantToLearn: Subcategory[];
}

export interface SwapOffer {
  targetUserId: number;
  skillToTeach: Subcategory;
  skillToLearn: Subcategory;
  currentUserEmail: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface OfferResponse {
  targetUserId: number;
  skillToLearn: Subcategory;
  skillToTeach: Subcategory;
}
