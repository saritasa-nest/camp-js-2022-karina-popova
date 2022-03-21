import { RouteObject, useRoutes } from 'react-router-dom';
import { LoginPage } from 'src/features/auth/pages/LoginPage';
import { RegisterPage } from 'src/features/auth/pages/RegisterPage';
import { HomePage } from 'src/features/films/pages/HomePage';
import { IsAuthenticatedGuard } from './guards/isAuthenticatedGuard';

const routes: RouteObject[] = [
  {
    path: '*',
    element: (
      <IsAuthenticatedGuard>
        <HomePage />
      </IsAuthenticatedGuard>
    ),
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: 'register',
    element: <RegisterPage />,
  },
  {
    path: 'home',
    element: (
      <IsAuthenticatedGuard>
        <HomePage />
      </IsAuthenticatedGuard>
    ),
  },
];

export const RootRouter: React.VFC = () => useRoutes(routes);
