import { createTheme } from "@mui/material";
import { red } from '@mui/material/colors'

export const theme = createTheme({
    palette: {
        primary: {
            main: '#FF6464',
        },
        secondary: {
            main: '#00ABCC',
        },
        error: {
            main: red.A400,
        },
    },
})

 