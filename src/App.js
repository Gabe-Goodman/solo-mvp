import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login, Register, Reset } from "./auth";
import { Dashboard, Map } from "./components";

function App() {
  //state
  const [signIn, setSignIn] = useState(false);
  const [locations, setLocations] = useState([
    {
      id: 1,
      latitude: -33.91727341958453,
      longitude: 151.23348314155578,
      name: "info",
    },
  ]);
  return (
    <div className="app">
      <Router>
        <Switch>
          {signIn === false ? (
            <Route exact path="/" component={Login} setSignIn={setSignIn} />
          ) : null}
          <Route exact path="/register" component={Register} />
          <Route exact path="/reset" component={Reset} />
          <Route
            exact
            path="/dashboard"
            render={(props) => <Dashboard locations={locations} />}
          />
        </Switch>
      </Router>
    </div>
  );
}
export default App;
