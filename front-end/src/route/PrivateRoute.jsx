import React from 'react';
import { Route, Redirect } from 'react-router-dom';

let authenticate = ()=> {
    const token = localStorage.getItem("token");
    return !!token;
}

const PrivateRoute = ({ component: Component, ...rest }) => {

    console.log('authenticate', authenticate())
    return (
        <Route
            {...rest}
            render={props => authenticate() ?
                <Redirect to={{
                    pathname: "/main",
                    state: { from: props.location }
                }} /> :
                <Redirect to={{
                    pathname: "/login",
                    state: { from: props.location }
                }} />
            }>
        </Route>
    )
}

export default PrivateRoute;