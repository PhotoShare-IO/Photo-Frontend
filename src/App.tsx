import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { useRoutes } from "react-router-dom";
import routes from "./routes";
import Header from "./components/header/Header";
import { createTheme, ThemeProvider } from "@mui/material";
import { components } from "./theme/components";
import { typography } from "./theme/typography";

function App() {
  const content = useRoutes(routes);

  const theme = createTheme({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    components,
    typography,
  });

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Header />
        {content}
      </ThemeProvider>
    </Provider>
  );
}

export default App;
