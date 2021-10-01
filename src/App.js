import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';
import { BrowserRouter, Route } from 'react-router-dom';
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
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/brand' component={Dashboard} />
            </SnackbarProvider>
          </BrowserRouter>
        
      </BaseProvider>
    </StyletronProvider>
  );
}