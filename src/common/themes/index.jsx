import {
    createMuiTheme
} from '@material-ui/core/styles';

import {
    deepPurple,
    indigo,
    grey,
    blueGrey,
} from '@material-ui/core/colors';

export const theme = createMuiTheme({
    typography: {
        h2: {
            family: "SourceSansPro",
            fontWeight: "bold",
            color: grey[500]
        },
        h5: {
            fontFamily: "SourceSansPro.ttf",
            color: grey[100],
        },
        title: {
            color: grey[900],
            fontWeight: "bold",

        },
        h6:{
            family: "SourceSansPro",
            fontSize: "16px",
            color: grey[100]
        },
        body1: {
            fontFamily: "SourceSansPro",
            color: grey[900],
        },
        body2: {
            family: "SourceSansPro",
            fontSize: "16px",
            fontWeight: "bold",
            color: grey[900]
        },
    },
    palette: {
        primary: {
            main: indigo[900],

        },
        secondary: {
            main: indigo[700],
            contrastText: deepPurple[900],
        },
        secondaryText: {
            main: blueGrey[500]
        },
        primaryText: {
            main: grey[100]
        },
        

    },

});

export default theme