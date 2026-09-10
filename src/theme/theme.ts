import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6C63FF',
      light: '#9D97FF',
      dark: '#4B44CC',
    },
    secondary: {
      main: '#FF6584',
    },
    background: {
      default: '#F4F6FB',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A1D23',
      secondary: '#6B7280',
    },
    success: {
      main: '#10B981',
    },
    warning: {
      main: '#F59E0B',
    },
    error: {
      main: '#EF4444',
    },
  },
  typography: {
    fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.5px',
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '-0.2px',
    },
    body2: {
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid #E5E7EB',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
          '&:hover': {
            boxShadow: '0 10px 25px rgba(108, 99, 255, 0.12), 0 4px 10px rgba(0,0,0,0.06)',
            borderColor: '#C4C0FF',
          },
          transition: 'box-shadow 0.25s ease, border-color 0.25s ease',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#1A1D23',
          borderBottom: '1px solid #E5E7EB',
          boxShadow: 'none',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '0.95rem',
          minHeight: 48,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #6C63FF 0%, #9D97FF 100%)',
          boxShadow: '0 4px 14px rgba(108, 99, 255, 0.35)',
          '&:hover': {
            background: 'linear-gradient(135deg, #4B44CC 0%, #6C63FF 100%)',
            boxShadow: '0 6px 20px rgba(108, 99, 255, 0.45)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: 6,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          border: '1px solid #E5E7EB',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
  },
});

export default theme;
