import type { Subcategory } from '../../api/types';

export type Step = 1 | 2 | 3;

export interface RegistrationFormState {
  email: string;
  password: string;
  name: string;
  birthDate: Date | null;
  gender: string;
  city: string;
  learnCategory: string;
  learnSubCategory: string;
  skillTitle: string;
  skillCategory: string;
  skillSubCategory: string;
  skillDescription: string;
  skillImages: File[];
  skillCanTeach: Subcategory[];
  subcategoriesWantToLearn: Subcategory[];
  [key: string]: any;
}
