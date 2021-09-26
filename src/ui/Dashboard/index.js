import * as React from 'react';
import {StatefulTabs, Tab, ORIENTATION} from 'baseui/tabs';
import Navigation from '../../components/Navigation';
import useMenu from '../../swr/menu';
import { useHistory } from 'react-router-dom';


export default function Dashboard(props) {

  const { data: menu} = useMenu(); 
  const history = useHistory()
  return (
    <div>
        <Navigation activeItemID={history.location.pathname} items={menu}></Navigation>
        <div>
            {props.children}
        </div>
    </div>
  );
}