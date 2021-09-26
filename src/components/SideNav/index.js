import * as React from 'react';
import Navigation from '../Navigation';


export default function Dashboard(props) {
  return (
    <div style={{display:'flex', flexDirection:'row'}}>
        <Navigation></Navigation>
        <div>
            {props.children}
        </div>
    </div>
  );
}