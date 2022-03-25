import { VFC } from 'react';
import { useAppDispatch } from 'src/store/store';
import { fetchCurrentUser } from 'src/store/user/dispatchers';

export const Layout: VFC<{ children: JSX.Element; }> = ({ children }) => {
  const dispatch = useAppDispatch();
  dispatch(fetchCurrentUser());
  return children;
};
