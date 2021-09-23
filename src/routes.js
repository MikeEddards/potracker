import React from "react";
import { Switch, Route } from "react-router";
import Dashboard from "./Components/Dashboard";
import PoBuilder from "./Components/PoBuilder"

export default (
    <Switch>
        <Route exact path='/' component={Dashboard} />
        <Route path='/builder' component={PoBuilder} />
    </Switch>
)