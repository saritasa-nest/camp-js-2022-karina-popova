import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from 'src/store/store';
import { selectIsAuth } from 'src/store/user/selectors';

export const IsAuthenticatedGuard: FC<{ children: JSX.Element; }> = ({ children }: { children: JSX.Element; }) => {
  const isAuth = useAppSelector(selectIsAuth);
  const location = useLocation();
  if (!isAuth) {
    return <Navigate to="login" state={{ from: location }} replace />;
  }
  return children;
};
