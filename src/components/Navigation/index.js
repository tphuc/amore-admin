import React, { useState } from 'react';
import {Block} from 'baseui/block';
import {  MenuAdapter } from "baseui/list";
import ChevronDown from 'baseui/icon/chevron-down';
import ChevronRight from 'baseui/icon/chevron-right';
import { useHistory } from 'react-router-dom';

function NavItem({
    item = {
    },
    activeItemID,
    onChange = () => {},
}) {

    const history = useHistory()
    const [expand, setExpand] = useState(false);

    const handleClick = React.useCallback(() => {
        // if group
        if (item?.children?.length) {
            setExpand(!expand)
        }
        else {
            // if nav item
            onChange(item)
        }

    }, [item, expand])

    const isMatchPath = () => {
        return history.location.pathname.includes(item.path)
    }

    return <>
        <MenuAdapter
            overrides={{
                Root: {
                    style:  ({ $theme }) => ({
                        
                        height: '52px',
                        backgroundColor: isMatchPath() ? $theme.colors.mono900 : $theme.colors.background
                      })
                },
                Content: {
                    style: ({ $theme }) => ({
                        color: isMatchPath() ? $theme.colors.white : $theme.colors.mono800
                    })
                }
            }}
            endEnhancer={() => item?.children?.length ? ( expand ? <ChevronDown size={24}  /> : <ChevronRight size={24}/> ) : null} 

            onClick={handleClick} >
            {item.name}
        </MenuAdapter>
        {expand && item.children?.map((data, id) => <NavItem key={id} item={data}  onChange={() => onChange(data)} />)}
    </>
}


function Navigation({
    items,
    activeItemID,
    onChange
}) {


    return (
        <Block >
            {items?.map((item, id) => <NavItem key={id} item={item} onChange={onChange} activeItemID={activeItemID} />)}
        </Block>
    )
}

export default Navigation;