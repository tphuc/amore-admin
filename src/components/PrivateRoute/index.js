import React from 'react';
import _ from 'lodash';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import { auth } from '../../framework/firebase';



function PrivateRoute({ component: Component, ...others }) {
    console.log('private route', auth.app, auth.currentUser)
  return (
    <Route
      {...others}
      render={props => (auth.currentUser ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location },
          }}
        />
      ))
        }
    />
  );
}

export default PrivateRoute;
