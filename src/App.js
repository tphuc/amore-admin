import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from './ui/Dashboard';
import {
  SnackbarProvider,
} from 'baseui/snackbar';

const engine = new Styletron();


export default function App() {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>

        <BrowserRouter>
          <SnackbarProvider>

              <Redirect from='/' to={'/dashboard'} />
              <Route path='/dashboard' component={Dashboard} />


          </SnackbarProvider>
        </BrowserRouter>

      </BaseProvider>
    </StyletronProvider>
  );
}