import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {AuthProvider, PrivateRoute} from 'react-auth-kit'
import Navbar from './components/Navbar';
import Home from "./pages/Home";
import Login from './pages/Login';
import Show from './pages/Show';
import Episode from './pages/Episode';
import User from './pages/User';
import Friends from './pages/Friends';

function App() {
    return (
        <BrowserRouter basename={'/'}>
            <Navbar/>
            <Switch>
                <Route exact path={'/'} component={Home}/>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/show/:id' component={Show}/>
                <Route exact path='/episode/:id' component={Episode}/>
                <Route exact path='/user/:id' component={User}/>
                <Route exact path='/friends' component={Friends}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;