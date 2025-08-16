import { type Skill, type CustomSkill } from '../skill/model';

export type Timestamp = string | number | Date;
export type UserSkill = Skill | CustomSkill;

export interface User {
  id: string;
  login: string;
  avatarUrl: string;
  name: string;
  location: string;
  age: Timestamp;
  gender: 'Не указан' | 'Мужской' | 'Женский';
  birthday: Timestamp;
  email: string;
  description: string;
  skillCanTeach: UserSkill[];
  subcategoriesWantToLearn: UserSkill[];
}

// пропсы для userCard
export interface UserCardProps extends User {
  showDetails?: boolean;
  showLike?: boolean;
  showDescription?: boolean;
}
