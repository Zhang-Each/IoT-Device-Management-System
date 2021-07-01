import './App.css';
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import PrivateRoute from "./route/PrivateRoute";
import {Route, Router, Switch} from "react-router-dom";
import React from "react";
import RegisterPage from "./pages/RegisterPage";


function App() {
  return (
    <div className="App">
      <Switch>
          <Route path={'/login'} component={LoginPage}/>
          <Route path={'/main'} component={MainPage}/>
          <Route path={'/register'} component={RegisterPage} />
          <PrivateRoute path={'/'} component={MainPage}/>
      </Switch>
    </div>
  );
}

export default App;
