import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Download from "../pages/Download/index";
import Home from "../pages/home/index";
import Signup from "../pages/Auth/Signup"
import { ContextApi } from "../helpers";

const AppRouter = () => {
    return (
        <ContextApi.Provider>
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/download" component={Download} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                </Switch>
            </Router>
        </ContextApi.Provider>
    )
}

export default AppRouter
