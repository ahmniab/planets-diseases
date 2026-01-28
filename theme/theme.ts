import { createTheme, ThemeOptions } from '@mui/material/styles';
import { colors } from './colors';

// Arabic typography configuration
const arabicTypography = {
  fontFamily: [
    'Tajawal', // Modern Arabic font
    'Noto Sans Arabic',
    'Cairo',
    'Amiri',
    '-apple-system',
    'BlinkMacSystemFont',
    'sans-serif',
  ].join(','),
  direction: 'rtl' as const,
};

// Common theme configuration
const baseThemeOptions: ThemeOptions = {
  direction: 'rtl',
  typography: {
    ...arabicTypography,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@100;200;300;400;500;600;700;800&display=swap');
        
        html {
          direction: rtl;
        }
        
        body {
          font-family: 'Tajawal', 'Noto Sans Arabic', sans-serif;
        }
        
        * {
          box-sizing: border-box;
        }
      `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          padding: '8px 24px',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderRadius: 16,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
      },
    },
  },
};

// Light theme
export const lightTheme = createTheme({
  ...baseThemeOptions,
  palette: {
    mode: 'light',
    primary: {
      light: colors.mintGreen,
      main: colors.forestGreen,
      dark: colors.emeraldGreen,
      contrastText: '#FFFFFF',
    },
    secondary: {
      light: colors.sandyBrown,
      main: colors.earthBrown,
      dark: colors.clayOrange,
      contrastText: '#FFFFFF',
    },
    error: {
      light: '#FF5F5F',
      main: colors.diseaseRed,
      dark: '#B71C1C',
      contrastText: '#FFFFFF',
    },
    warning: {
      light: '#FFE082',
      main: colors.warningAmber,
      dark: '#F57C00',
      contrastText: '#000000',
    },
    info: {
      light: '#64B5F6',
      main: colors.healingBlue,
      dark: '#1976D2',
      contrastText: '#FFFFFF',
    },
    success: {
      light: colors.mintGreen,
      main: colors.emeraldGreen,
      dark: colors.forestGreen,
      contrastText: '#FFFFFF',
    },
    background: {
      default: colors.light.background,
      paper: colors.light.surface,
    },
    text: {
      primary: colors.light.onBackground,
      secondary: colors.leafGray,
    },
    divider: colors.light.outline,
  },
});

// Dark theme
export const darkTheme = createTheme({
  ...baseThemeOptions,
  palette: {
    mode: 'dark',
    primary: {
      light: colors.mintGreen,
      main: colors.emeraldGreen,
      dark: colors.forestGreen,
      contrastText: '#000000',
    },
    secondary: {
      light: colors.terracotta,
      main: colors.clayOrange,
      dark: colors.earthBrown,
      contrastText: '#FFFFFF',
    },
    error: {
      light: '#FF6B6B',
      main: colors.diseaseRed,
      dark: '#C62828',
      contrastText: '#FFFFFF',
    },
    warning: {
      light: '#FFD54F',
      main: colors.warningAmber,
      dark: '#F57C00',
      contrastText: '#000000',
    },
    info: {
      light: '#81C784',
      main: colors.healingBlue,
      dark: '#388E3C',
      contrastText: '#FFFFFF',
    },
    success: {
      light: colors.mintGreen,
      main: colors.emeraldGreen,
      dark: colors.sageGreen,
      contrastText: '#000000',
    },
    background: {
      default: colors.dark.background,
      paper: colors.dark.surface,
    },
    text: {
      primary: colors.dark.onBackground,
      secondary: colors.stoneGray,
    },
    divider: colors.dark.outline,
  },
});