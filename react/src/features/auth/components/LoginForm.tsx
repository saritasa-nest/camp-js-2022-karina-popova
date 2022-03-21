import { VFC } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthService } from 'src/api/services/auth.service';
import { setUser } from 'src/store/user/slice';
import { Form } from './Form';

const LoginFormComponent: VFC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (email: string, password: string): void => {
    AuthService.signIn(email, password).then(user => {
      dispatch(setUser({ user, isAuthenticated: true }));
      navigate('/home');
    });
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
