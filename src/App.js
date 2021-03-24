import './App.css';
import AppRouter from "./routes/AppRouter"
import {CssBaseline, ThemeProvider } from '@material-ui/core';
import {theme} from "./common/themes"

function App(props) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <AppRouter/>
    </ThemeProvider>
  );
}

export default App;
