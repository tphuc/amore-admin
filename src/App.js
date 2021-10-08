import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from './ui/Dashboard';
import {
  SnackbarProvider,
} from 'baseui/snackbar';
import Login from './ui/Login';

import PrivateRoute from './components/PrivateRoute';
import { getAuth } from '@firebase/auth';


const engine = new Styletron();


export default function App() {
  console.log(getAuth().currentUser)

  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <SnackbarProvider>
          <BrowserRouter>
            <Switch>
              
              <PrivateRoute path='/dashboard' component={Dashboard} />
              <Route exact path='/login' component={Login} />
            </Switch>

          </BrowserRouter>
        </SnackbarProvider>

      </BaseProvider>
    </StyletronProvider>
  );
}