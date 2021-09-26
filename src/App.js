import {Client as Styletron} from 'styletron-engine-atomic';
import {Provider as StyletronProvider} from 'styletron-react';
import {LightTheme, BaseProvider} from 'baseui';
import { BrowserRouter, Route } from 'react-router-dom';
import Dashboard from './ui/Dashboard';
const engine = new Styletron();


export default function App() {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <BrowserRouter>
            <Route exact path='/' component={Dashboard} />
        </BrowserRouter>
      </BaseProvider>
    </StyletronProvider>
  );
}