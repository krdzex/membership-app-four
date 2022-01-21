import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { useLocation } from 'react-router';

const MultiplayerRoute = ({ component: Component, ...rest }) => {
    const location = useLocation();
    return (<Route
        {...rest}
        render={(props) =>
            location.state !== undefined ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: "/game", state: { from: props.location } }}
                />
            )
        }
    />)
}

export default MultiplayerRoute;