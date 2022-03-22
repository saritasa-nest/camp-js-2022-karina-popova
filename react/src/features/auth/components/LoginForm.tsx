import { VFC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/store/store';
import { signInUser } from 'src/store/user/dispatchers';
import { selectUserError } from 'src/store/user/selectors';
import { Form } from './Form';

const LoginFormComponent: VFC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector(selectUserError);
  const handleLogin = (email: string, password: string): void => {
    dispatch(signInUser({ email, password }))
      .unwrap()
      .then(() => navigate('/home'));
  };
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
