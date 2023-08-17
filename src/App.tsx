import { Provider } from "react-redux";
import { store } from "./redux/store";
import { useRoutes } from "react-router-dom";
import routes from "./routes";
import Header from "./components/header/Header";

function App() {
  const content = useRoutes(routes);

  return (
    <Provider store={store}>
        <Header />
        {content}
    </Provider>
  );
}

export default App;
