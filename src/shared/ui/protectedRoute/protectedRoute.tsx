// import { userSliceSelectors  } from '@/services/slices/authSlice';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { FC } from 'react';
import {
  isInitSelector,
  isLoggedInSelector,
} from '../../../services/authSlice/authSlice';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactNode;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  onlyUnAuth = false,
  children,
}) => {
  const isAuthChecked = useSelector(isInitSelector);
  const user = useSelector(isLoggedInSelector);
  const location = useLocation();
  const incomingState = location.state as { backgroundLocation?: Location };

  if (!isAuthChecked) {
    return <div>Загрузка...</div>;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" replace state={incomingState} />;
  }

  if (onlyUnAuth && user) {
    return <Navigate to="/profile" replace />;
  }

  return children;
};
