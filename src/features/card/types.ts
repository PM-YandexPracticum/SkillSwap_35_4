import type { User } from '../../models/user/model';

export interface CardProps extends User {
  isLiked: boolean;
  hasRequested: boolean;
  onToggleLike: () => void;
  onDetailsClick: () => void;

  showLike?: boolean;
  showDetails?: boolean;
  showDescription?: boolean;

  variant?: 'list' | 'profile';
}
