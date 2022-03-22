import { VFC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/store/store';
import { signUpUser } from 'src/store/user/dispatchers';
import { selectUserError } from 'src/store/user/selectors';
import { Form } from './Form';

const RegisterFormComponent: VFC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector(selectUserError);
  const handleRegister = (email: string, password: string): void => {
    dispatch(signUpUser({ email, password }))
      .unwrap()
      .then(() => navigate('/home'));
  };
  return (
    <Form
      title="Sign up"
      handleSubmit={handleRegister}
      redirectLink="/login"
      redirectLinkName="sign in"
      error={error}
    />
  );
};

export const RegisterForm = RegisterFormComponent;
