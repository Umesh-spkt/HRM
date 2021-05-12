import React from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import Dashboard from "./components/dashboard";
import ViewUser from "./components/popups/ViewUser";
import UpdateUser from "./components/popups/UpdateUser";
import AddUser from "./components/popups/AddUser";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/users/add" component={AddUser} />
          <Route exact path="/users/edit/:id" component={UpdateUser} />
          <Route exact path="/users/:id" component={ViewUser} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
