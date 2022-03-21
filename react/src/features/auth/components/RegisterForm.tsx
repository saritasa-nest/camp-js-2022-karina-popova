import { VFC } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthService } from 'src/api/services/auth.service';
import { setUser } from 'src/store/user/slice';
import { Form } from './Form';

const RegisterFormComponent: VFC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRegister = (email: string, password: string): void => {
    AuthService.signUp(email, password).then(user => {
      dispatch(setUser({ user, isAuthenticated: true }));
      navigate('/home');
    });
  };
  return (
    <Form
      title="Sign up"
      handleClick={handleRegister}
      redirectLink="/login"
      redirectLinkName="sign in"
    />
  );
};

export const RegisterForm = RegisterFormComponent;
