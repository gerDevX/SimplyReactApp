import { format, isDate } from "date-fns";
import { useEffect, useState } from "react";
import useAppState from "../hooks/useAppState";
import { IUserModel } from "../interfaces";

const Dashboard = () => {
  const { appState, retrieveUsers, signOut } = useAppState();
  const { user } = appState;
  const [users, setUsers] = useState<IUserModel[]>([]);

  useEffect(() => {
    if (appState.isSignIn) {
      (async (): Promise<void> => {
        setUsers(await retrieveUsers());
      })();
    }
  }, []);

  return (
    <div className="container">
      <header className="navbar">
        <section className="navbar-section">
          <a href="#" className="navbar-brand mr-2">
            Hola {user.fullname}!!
          </a>
        </section>
        <section className="navbar-section">
          <button className="btn btn-primary btn-sm" onClick={signOut}>
            Close Session
          </button>
        </section>
      </header>

      <div className="columns detail">
        <div className="column col-2 col-sm-1"></div>
        <div className="column col-8 col-sm-10">
          <h3>Dashboard</h3>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <td>Name</td>
                <td>Birth Date</td>
                <td>Photo</td>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 && (
                <tr>
                  <td colSpan={3}>No data to display.</td>
                </tr>
              )}
              {users.length > 0 &&
                users.map((u: IUserModel) => {
                  return (
                    <tr key={u.contactId}>
                      <td>{u.name + " " + u.surnames}</td>
                      <td>
                        {isDate(new Date(u.birthDate)) &&
                          format(new Date(u.birthDate), "MMMM dd, yyyy")}
                      </td>
                      <td>
                        {u.photo ? (
                          <figure className="avatar avatar-xl">
                            <img src={u.photo} alt="Photo" />
                          </figure>
                        ) : (
                          <figure
                            className="avatar avatar-xl"
                            data-initial="U"
                            style={{ backgroundColor: "#5755d9" }}
                          />
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div className="column col-2 col-sm-1"></div>
      </div>
    </div>
  );
};

export default Dashboard;
