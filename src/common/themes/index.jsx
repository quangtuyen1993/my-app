import { createMuiTheme } from "@material-ui/core/styles";

import {  indigo, grey, red } from "@material-ui/core/colors";

export const theme = createMuiTheme({
  typography: {
    h2: {
      family: "SourceSansPro",
      fontWeight: "bold",
      color: grey[500],
    },
    h5: {
      fontFamily: "SourceSansPro.ttf",
      color: grey[100],
    },
    title: {
      color: grey[900],
      fontWeight: "bold",
    },
    h6: {
      family: "SourceSansPro",
      fontSize: "16px",
      color: grey[100],
    },
    body1: {
      fontFamily: "SourceSansPro",
      color: grey[900],
    },
    body2: {
      family: "SourceSansPro",
      fontSize: "16px",
      fontWeight: "bold",
      color: grey[900],
    },
  },
  palette: {
    primary: {
      main: indigo[900],
      contrastText: "#fff",
    },
    error: {
      main: red[500],
    },
    secondary: {
      main: indigo[700],
      contrastText: "#fff",
    },
  },
});

export default theme;
