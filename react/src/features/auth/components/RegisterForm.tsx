import { VFC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'src/store/store';
import { signUpUser } from 'src/store/user/dispatchers';
import { Form } from './Form';

const RegisterFormComponent: VFC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleRegister = (email: string, password: string): void => {
    dispatch(signUpUser({ email, password }))
      .unwrap()
      .then(() => navigate('/home'));
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
