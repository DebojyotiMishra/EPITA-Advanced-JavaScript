import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0071e3',
      light: '#2997ff',
      dark: '#0071e3',
    },
    secondary: {
      main: '#86868b',
      light: '#f5f5f7',
      dark: '#1d1d1f',
    },
    background: {
      default: '#000000',
      paper: '#1d1d1f',
    },
    text: {
      primary: '#f5f5f7',
      secondary: '#86868b',
    },
  },
  typography: {
    fontFamily: 'Geist, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      fontVariationSettings: '"wght" 700',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      fontVariationSettings: '"wght" 700',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
      fontVariationSettings: '"wght" 600',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      fontVariationSettings: '"wght" 600',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      fontVariationSettings: '"wght" 500',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      fontVariationSettings: '"wght" 500',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      fontWeight: 400,
      fontVariationSettings: '"wght" 400',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      fontWeight: 400,
      fontVariationSettings: '"wght" 400',
    },
    button: {
      fontWeight: 500,
      fontVariationSettings: '"wght" 500',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 0,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '980px',
          textTransform: 'none',
          padding: '8px 22px',
          fontSize: '17px',
          fontWeight: 500,
          fontVariationSettings: '"wght" 500',
          '&:hover': {
            backgroundColor: 'primary.main',
            color: 'white',
          },
        },
        contained: {
          boxShadow: 'none',
          borderRadius: '8px',
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: 'primary.main',
          },
        },
        text: {
          borderRadius: '8px',
          '&:hover': {
            backgroundColor: 'primary.main',
            color: 'white',
          },
        },
        sizeSmall: {
          padding: '4px 8px',
          fontSize: '14px',
          borderRadius: '8px',
          justifyContent: 'flex-start',
          minWidth: 'auto',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '18px',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '18px',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.2)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.3)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'primary.main',
            },
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          '&.navbar-title': {
            '&:hover': {
              color: 'white',
            },
          },
        },
      },
    },
  },
})

export default theme 