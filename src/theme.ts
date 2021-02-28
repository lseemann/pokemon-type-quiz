import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from '@material-ui/core/styles';

export const theme = createMuiTheme({
  overrides: {},
  palette: {
    error: {
      main: '#dc4738',
    },
    primary: {
      main: '#003965',
    },
    secondary: {
      main: '#5e4876',
    },
    success: {
      main: '#008e09',
    },
  },
});

export default theme;
