import { useEffect, VFC } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthForm } from 'src/models/authorization-form';
import { useAppDispatch, useAppSelector } from 'src/store/store';
import { signUpUser } from 'src/store/user/dispatchers';
import { selectIsAuth, selectUserError } from 'src/store/user/selectors';
import { Form } from './Form';

const RegisterFormComponent: VFC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector(selectUserError);
  const isAuth = useAppSelector(selectIsAuth);
  const handleRegister = ({ email, password }: AuthForm): void => {
    dispatch(signUpUser({ email, password }));
  };
  useEffect(() => {
    if (isAuth) {
      navigate('/home');
    }
  }, [isAuth, navigate]);
  return (
    <Form
      title="Sign up"
      onSubmit={handleRegister}
      redirectLink="/login"
      redirectLinkName="sign in"
      error={error}
    />
  );
};

export const RegisterForm = RegisterFormComponent;
