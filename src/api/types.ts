export interface Subcategory {
  id: number;
  name: string;
}

export interface SkillCategory {
  id: number;
  name: string;
  subcategories: Subcategory[];
}

export interface Gender {
  id: number;
  name: string;
}

export interface City {
  id: number;
  name: string;
}

export interface User {
  id: number;
  login: string;
  password: string;
  avatarUrl: string;
  name: string;
  location: string;
  age: string;
  gender: string;
  description: string;
  skillCanTeach: Subcategory[];
  subcategoriesWantToLearn: Subcategory[];
}

export interface LearningType {
  id: string;
  name: string;
}

export interface FiltersData {
  genders: Gender[];
  skills: SkillCategory[];
  cities: City[];
  learningTypes: LearningType[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface LoginData {
  login: string;
  password: string;
}

export interface UserFilters {
  cityIds?: number[];
  genderIds?: number[];
  skillIds?: number[];
  subcategoryIds?: number[];
  ageRange?: [number, number];
  searchQuery?: string;
  learningType?: 'teach' | 'learn' | 'both';
}
