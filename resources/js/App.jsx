import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {AuthProvider, PrivateRoute} from 'react-auth-kit'
import Navbar from './components/Navbar';
import Home from "./pages/Home";
import Login from './pages/Login';

function App() {
    return (
        <AuthProvider authType={'cookie'}
                      authName={'_auth'}
                      cookieDomain={window.location.hostname}
        >
            <BrowserRouter basename={'/'}>
                <Navbar/>
                <Switch>
                    <Route exact path={'/'} component={Home}/>
                    <Route exact path='/login' component={Login}/>
                </Switch>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;