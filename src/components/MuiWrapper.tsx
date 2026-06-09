import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    background: {
      default: '#FAF8F5',   // Warm Cream
      paper: '#FFFFFF',     // White
    },
    text: {
      primary: '#1A1A1A',   // Dark Neutral
    },
    primary: {
      main: '#8B5C1A',      // Deep Amber
    },
    secondary: {
      main: '#A6804E',    // Light Amber
    },
    divider: '#F0EAE1',     // Soft Cream border
  },
  shape: {
    borderRadius: 12,       // 12px border radius
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 700,
    },
    subtitle1: {
      fontWeight: 700,
      textTransform: 'uppercase',
      fontSize: '0.75rem',
      letterSpacing: '0.15em',
    },
    subtitle2: {
      fontWeight: 700,
      textTransform: 'uppercase',
      fontSize: '0.675rem',
      letterSpacing: '0.12em',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: 'none',
          padding: '10px 20px',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          border: '1px solid #F0EAE1',
          boxShadow: '0px 4px 20px rgba(26, 26, 26, 0.03)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            '& fieldset': {
              borderColor: '#F0EAE1',
            },
            '&:hover fieldset': {
              borderColor: '#A6804E',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#8B5C1A',
            },
          },
        },
      },
    },
  },
});

interface MuiWrapperProps {
  children: React.ReactNode;
}

export default function MuiWrapper({ children }: MuiWrapperProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
