import { useContext } from "react";
import { AppContext } from "../contexts/appContext";

const useAppState = () => {
  const context = useContext(AppContext);

  return context;
};

export default useAppState;
