import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAppState from "../hooks/useAppState";

const SignIn = () => {
  const navigate = useNavigate();
  const { appState, signIn } = useAppState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    await signIn(username, password);
  };

  useEffect(() => {
    if (appState.isSignIn) {
      navigate("/dashboard");
    }
  }, [appState.isSignIn]);

  return (
    <div className="login container">
      <div className="columns">
        <div className="column col-4 col-sm-2"></div>
        <div className="column col-4 col-sm-8">
          <h3>Login</h3>

          <div className="form-group">
            {appState.isError && (
              <span className="label label-rounded label-error">
                {appState.msg}
              </span>
            )}
            <label className="form-label" htmlFor="txtUsername">
              User Name
            </label>
            <input
              className="form-input"
              placeholder="User Name / Email"
              id="txtUsername"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
            <label className="form-label" htmlFor="txtPassword">
              Password
            </label>
            <input
              className="form-input"
              placeholder="Password"
              id="txtPassword"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="btn btn-primary" onClick={submit}>
            Login
          </button>
        </div>
        <div className="column col-4 col-sm-2"></div>
      </div>
    </div>
  );
};

export default SignIn;
