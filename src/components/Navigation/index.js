import React, { useState } from 'react';
import {Block} from 'baseui/block';
import {  MenuAdapter } from "baseui/list";
import ChevronDown from 'baseui/icon/chevron-down';
import ChevronRight from 'baseui/icon/chevron-right';

function NavItem({
    item = {
    },
    activeItemID,
    onChange = () => {},
}) {

    const [expand, setExpand] = useState(false);

    const handleClick = React.useCallback(() => {
        // if group
        if (item?.children?.length) {
            setExpand(!expand)
        }
        else {
            // if nav item
            onChange({ item: item })
        }

    }, [item, expand])

    return <>
        <MenuAdapter
            endEnhancer={() => item?.children?.length ? ( expand ? <ChevronDown size={24}  /> : <ChevronRight size={24}/> ) : null} onClick={handleClick} >
            {item.name}
        </MenuAdapter>
        {expand && item.children?.map(data => <NavItem item={data} activeItemID={activeItemID} onChange={onChange} />)}
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