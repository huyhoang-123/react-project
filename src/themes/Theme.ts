import background from '../../src/assets/images/background-LoginPage.jpg';
import { createTheme } from '@mui/material';

export const theme = createTheme({
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          height: '100vh',
          backgroundImage: `url(${background})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          display: 'flex',
          justifyContent: 'center',
        },
      },
    },
    MuiStack: {
      defaultProps: {
        spacing: 3,
      },
      styleOverrides: {
        root: {
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          maxWidth: '80%',
          margin: '50px auto',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          maxWidth: 300,
          width: '100%',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        variant: 'contained',
        size: 'small',
      },
      styleOverrides: {
        root: {
          background: `linear-gradient(45deg, #18a5a7, #bfffc7)`,
          maxHeight: '50px',
          maxWidth: 300,
          width: '100%',
        },
      },
    },
  },
});
