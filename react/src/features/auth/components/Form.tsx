import React, { useState, VFC } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Link } from 'react-router-dom';

interface Props {
  /** Form name . */
  readonly title: string;
  /** Event handler on form submit. */
  readonly handleClick: Function;
  /** Link path. */
  readonly redirectLink: string;
  /** Link name. */
  readonly redirectLinkName: string;
}
const FormComponent: VFC<Props> = ({
  title,
  redirectLink,
  redirectLinkName,
  handleClick,
}) => {
  const [open] = React.useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          margin="dense"
          id="password"
          label="Password"
          type="password"
          fullWidth
          variant="standard"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Link to={redirectLink}>{redirectLinkName}</Link>
        <Button onClick={() => handleClick(email, password)}>{title}</Button>
      </DialogActions>
    </Dialog>
  );
};

export const Form = FormComponent;
