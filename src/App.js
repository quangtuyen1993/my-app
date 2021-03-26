import "./App.css";
import AppRouter from "./routes/AppRouter";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { Provider } from "react-redux";
import { theme } from "./common/themes";
import store from "./redux/store";

function App(props) {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <CssBaseline />
        <AppRouter />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
