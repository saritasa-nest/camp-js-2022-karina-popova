import React, { VFC } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { FormHelperText } from '@mui/material';

/** Authorization form . */
export interface AuthForm {
  /** Email. */
  readonly email: string;
  /** Password. */
  readonly password: string;
}

interface Props {
  /** Form name . */
  readonly title: string;
  /** Event handler on form submit. */
  readonly handleSubmit: (data: AuthForm) => void;
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
  handleSubmit,
  error,
}) => {
  const [open] = React.useState(true);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: ({ email, password }) => {
      handleSubmit({ email, password });
    },
  });

  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
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
          <FormHelperText error>{ error }</FormHelperText>
          <DialogActions>
            <Link to={redirectLink}>{redirectLinkName}</Link>
            <Button color="primary" variant="contained" type="submit">
              {title}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export const Form = FormComponent;
