import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {
    const isLoggedIn =()=>{
        if(localStorage.getItem("token")){
            return true
        }else{return false;}
    };
    return (

       
        <Route {...rest} render={props => (
            isLoggedIn() ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;