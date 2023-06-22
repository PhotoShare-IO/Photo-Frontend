import { Provider } from "react-redux";
import { store } from "./redux/store";
import { useRoutes } from "react-router-dom";
import routes from "./routes";
import { AuthProvider } from "./contexts/JWTcontext";

function App() {
  const content = useRoutes(routes);

  return (
    <Provider store={store}>
      <AuthProvider>{content}</AuthProvider>
    </Provider>
  );
}

export default App;
