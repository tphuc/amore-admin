import * as React from 'react';
import { StatefulTabs, Tab, ORIENTATION } from 'baseui/tabs';
import Navigation from '../../components/Navigation';
import useMenu from '../../swr/menu';
import { useHistory,Route } from 'react-router-dom';
import { Block } from 'baseui/block';
import { useStyletron } from 'baseui';
import Category from './Category';
import Brand from './Brand';
import Product from './Product';
import Order from './Order';



export default function Dashboard(props) {

  const { data: menu } = useMenu();
  const history = useHistory();
  const [_, theme] = useStyletron();
  
  return (
    <Block width='100vw' display='flex' flexDirection='row'>
      <Block width={['200px']} minHeight='100vh' backgroundColor={theme.colors.backgroundAlt}>
        <Navigation onChange={(item) => {
          history.push('/dashboard' + item.path)
        }} items={menu}></Navigation>
      </Block>
      <Block padding={'2%'} flex={1} backgroundColor={theme.colors.backgroundSecondary}>
        <Route path='/dashboard/category' component={Category}/>
        <Route path='/dashboard/brand' component={Brand}/>
        <Route path='/dashboard/product' component={Product}/>
        <Route path='/dashboard/order' component={Order}/>
      </Block>
    </Block>
  );
}