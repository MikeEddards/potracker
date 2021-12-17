import React from "react";
import { Switch, Route } from "react-router";
import Dashboard from "./Components/Dashboard";
import Download from "./Components/Download";
import PoBuilder from "./Components/PoBuilder"
import PoSearch from "./Components/PoSearch";
import PrintList from "./Components/PrintList";

export default (
    <Switch>
        <Route exact path='/' component={Dashboard} />
        <Route path='/builder' component={PoBuilder} />
        <Route path='/posearch' component={PoSearch} />
        <Route path='/printlist' component={PrintList} />
        <Route path='/download' component={Download} />
    </Switch>
)