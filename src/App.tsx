import "./App.css";
import { AppProvider } from "./contexts/appProvider";
import RouteConfig from "./routeConfig";

function App() {
  return (
    <AppProvider>
      <RouteConfig />
    </AppProvider>
  );
}

export default App;
