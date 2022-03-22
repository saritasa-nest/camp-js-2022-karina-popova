import { useEffect, VFC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/store/store';
import { signInUser } from 'src/store/user/dispatchers';
import { selectIsAuth, selectUserError } from 'src/store/user/selectors';
import { AuthForm, Form } from './Form';

const LoginFormComponent: VFC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector(selectUserError);
  const isAuth = useAppSelector(selectIsAuth);
  const handleLogin = ({ email, password }: AuthForm): void => {
    dispatch(signInUser({ email, password }))
      .catch(err => err);
  };
  useEffect(() => {
    if (isAuth) {
      navigate('/home');
    }
  }, [isAuth, navigate]);
  return (
    <Form
      title="Login"
      handleSubmit={handleLogin}
      redirectLink="/register"
      redirectLinkName="sign up"
      error={error}
    />
  );
};

export const LoginForm = LoginFormComponent;
