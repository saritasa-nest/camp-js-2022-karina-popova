import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { selectIsAuth } from 'src/store/user/selectors';

export const IsAuthenticatedGuard: FC<{ children: JSX.Element; }> = ({ children }: { children: JSX.Element; }) => {
  const isAuth = useSelector(selectIsAuth);
  const location = useLocation();
  if (!isAuth) {
    return <Navigate to="login" state={{ from: location }} replace />;
  }
  return children;
};
