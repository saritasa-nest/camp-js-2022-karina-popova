import { VFC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'src/store/store';
import { signInUser } from 'src/store/user/dispatchers';
import { Form } from './Form';

const LoginFormComponent: VFC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogin = (email: string, password: string): void => {
    dispatch(signInUser({ email, password }))
      .unwrap()
      .then(() => navigate('/home'));
  };
  return (
    <Form
      title="Login"
      handleClick={handleLogin}
      redirectLink="/register"
      redirectLinkName="sign up"
    />
  );
};

export const LoginForm = LoginFormComponent;
