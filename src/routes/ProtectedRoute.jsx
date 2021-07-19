import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getAccessToken } from '../utils';


const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const isUser = getAccessToken();
        if (!isUser) {
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }
        else
            return <Component {...props} />
    }} />
);
export {
    PrivateRoute
}