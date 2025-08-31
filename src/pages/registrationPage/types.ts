export type Step = 1 | 2 | 3;

export type RegistrationData = {
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
};
