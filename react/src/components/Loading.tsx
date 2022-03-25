import { Box, CircularProgress } from '@mui/material';

const AppLoadingSpinnerComponent: React.VFC = () => (
  <Box sx={{
    display: 'flex',
    justifyContent: 'center',
    my: 2,
  }}
  >
    <CircularProgress />
  </Box>
);

export const AppLoadingSpinner = AppLoadingSpinnerComponent;
