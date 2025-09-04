import type { User } from "../../models/user/model";

export type UserProfile = Omit<User, 'id' | 'login' | 'age' | 'skillCanTeach' | 'subcategoriesWantToLearn'>;
