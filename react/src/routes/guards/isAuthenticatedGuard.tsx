import { VFC } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AppLoadingSpinner } from 'src/components/Loading';
import { useAppSelector } from 'src/store/store';
import { selectIsAuth, selectIsLoading } from 'src/store/user/selectors';

export const IsAuthenticatedGuard: VFC = () => {
  const isAuth = useAppSelector(selectIsAuth);
  const isLoading = useAppSelector(selectIsLoading);
  const location = useLocation();
  if (isLoading) {
    return <AppLoadingSpinner />;
  }
  if (!isAuth && !isLoading) {
    return <Navigate to="login" state={{ from: location }} replace />;
  }
  return <Outlet />;
};
