import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {AuthProvider, PrivateRoute} from 'react-auth-kit'
import Home from "./pages/Home";
import Navbar from './components/Navbar';

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
                </Switch>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;