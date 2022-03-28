import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import { LoginPage } from 'src/features/auth/pages/LoginPage';
import { RegisterPage } from 'src/features/auth/pages/RegisterPage';
import { FilmDetails } from 'src/features/films/pages/FilmDetails';
import { HomePage } from 'src/features/films/pages/HomePage';
import { IsAuthenticatedGuard } from './guards/isAuthenticatedGuard';

const routes: RouteObject[] = [
  {
    element: <IsAuthenticatedGuard />,
    children: [
      {
        path: 'home',
        element: <HomePage />,
        children: [
          {
            path: ':id',
            element: <FilmDetails />,
          },
        ],
      },
    ],
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
    path: '*',
    element: <Navigate to="home" />,
  },
];

export const RootRouter: React.VFC = () => useRoutes(routes);
