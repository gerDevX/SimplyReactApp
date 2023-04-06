import { BrowserRouter, Route, Routes } from "react-router-dom";
import useAppState from "./hooks/useAppState";
import SignIn from "./views/signIn";
import Dashboard from "./views/dashboard";

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const Private = ({ Item }: any) => {
  const { appState } = useAppState();

  return appState.isSignIn ? <Item /> : <SignIn />;
};

const RouteConfig = () => {
  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route path="/dashboard" element={<Private Item={Dashboard} />} />
          <Route path="/" element={<Private Item={Dashboard} />} />
          <Route path="*" element={<SignIn />} />
        </Routes>
      </>
    </BrowserRouter>
  );
};

export default RouteConfig;
