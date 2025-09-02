// import { userSliceSelectors  } from '@/services/slices/authSlice';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { FC } from 'react';
import { isInitSelector, userSelector } from '../../../services/authSlice/authSlice';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactNode	;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  onlyUnAuth = false,
  children
}) => {
  const isAuthChecked = useSelector(isInitSelector);
  const user = useSelector(userSelector);
  const location = useLocation();

  if (!isAuthChecked) {
    return <div>Загрузка...</div>;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

  return children;
};
