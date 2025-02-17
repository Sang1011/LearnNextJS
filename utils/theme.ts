import { createTheme, responsiveFontSizes } from "@mui/material";
import { red } from "@mui/material/colors";

export let theme = createTheme({
  typography: {
    fontFamily: 'Heebo, sans-serif',
  }
  ,
  palette: {
    primary: {
      main: "#FF6464",
    },
    secondary: {
      main: "#00ABCC",
      light: "#EDF7FA"
    },
    error: {
      main: red.A400,
    },
    text: {
      primary: '#21243D'
    }
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        maxWidthSm: {
          maxWidth: "680px",
          "@media (min-width: 600px)": {
            maxWidth: "680px",
          },
        },
        maxWidthMd: {
          maxWidth: "860px",
          "@media (min-width: 900px)": {
            maxWidth: "860px",
          },
        },
      },
      defaultProps: {
        maxWidth: "md",
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'hover'

      },
      styleOverrides: {
        root: {
          color: "black",
          '&:hover, &.active': {
            color: '#FF6464'
          }
        }
      }
    },
    MuiButton: {
      variants: [
        {
          props: {
            variant: 'contained', color: 'primary'
          },
          style: {
            color: "white"
          }
        }
      ]
    },
    MuiChip: {
      styleOverrides: {
        root: {
          paddingInline: 2,
        }
      },
      variants: [
        {
          props: {color: "secondary"},
          style: {
            color: "white",
            backgroundColor: "#142850",
            fontSize: 16,
            fontWeight: 'bold'
          }
        },
        {
          props: {color: "primary"},
          style: {
            color: "white",
            fontSize: 16,
            fontWeight: 'bold'
          }
        }
      ]
    }
  },
  
});

theme = responsiveFontSizes(theme)

// theme.typography.h3 = {
//   fontSize: '2rem',
//   [theme.breakpoints.up('md')]: {
//     fontSize: '3rem'
//   }
// }