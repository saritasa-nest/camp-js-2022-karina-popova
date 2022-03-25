import { VFC } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { FormHelperText, Typography } from '@mui/material';
import { AuthForm } from 'src/models/authorization-form';
import styles from './form.module.css';

interface Props {
  /** Form name . */
  readonly title: string;
  /** Event handler on form submit. */
  readonly onSubmit: (data: AuthForm) => void;
  /** Link path. */
  readonly redirectLink: string;
  /** Link name. */
  readonly redirectLinkName: string;
  /** Send error. */
  readonly error?: string;
}
const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
});
const FormComponent: VFC<Props> = ({
  title,
  redirectLinkName,
  redirectLink,
  onSubmit,
  error,
}) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: ({ email, password }) => {
      onSubmit({ email, password });
    },
  });

  return (
    <div className={styles.container}>
      <form onSubmit={formik.handleSubmit}>
        <Typography variant="h4">{title}</Typography>
        <TextField
          variant="standard"
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          variant="standard"
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <FormHelperText error>{error}</FormHelperText>
        <div className={styles.form_footer}>
          <Link to={redirectLink}>{redirectLinkName}</Link>
          <Button color="primary" variant="contained" type="submit">
            {title}
          </Button>
        </div>
      </form>
    </div>
  );
};

export const Form = FormComponent;
