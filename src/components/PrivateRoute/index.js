import React from 'react';
import _ from 'lodash';
import {
  Route,
  Redirect,
} from 'react-router-dom';

import { supabase } from '../../framework/supabase';



function PrivateRoute({ component: Component, ...others }) {
  const session = supabase.auth.session();
  const isExpired = session?.expires_at - (new Date().getTime() / 1000)  < 0
  return ( 
    <Route
      {...others}
      render={props => (session && !isExpired  ? (
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
