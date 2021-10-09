import React from 'react';
import { Block } from 'baseui/block'
import { Input } from 'baseui/input'
import { Button } from 'baseui/button'
import { Search } from 'baseui/icon';
import { Select } from 'baseui/select'

export default function SearchBar({
    onSearch = (data) => {},
    fields = [
        {
            type: "text",
            placeholder: 'Tên',
            id: 'label',
        },
        {
            type:'select',
            placeholder: 'Lựa chọn',
            id: 'options',
        }
    ]
}) {
    const [data, setData] = React.useState({});

    const renderItem = (item) => {
        switch(item.type){
            case 'text':
            default:
                return <Input size='compact' placeholder={item.placeholder} value={data[item.id]} onChange={(e) => setData(({ ...data, [item.id]: e.target.value }))} ></Input>

            case 'select':
                return <Select
                    value={data[item.id]}
                    onChange={({ value }) => setData(prev => ({ ...prev, [item.id]: value }))}
                    options={item.options || []}
                    placeholder={item.placeholder || ''}
                    {...item.props}
                />


        }
    }

    return <Block display='flex' flexDirection='row' justifyContent='space-around'>
        {fields?.map(item => renderItem(item))}
        <Button onClick={() => onSearch(data)} size='compact'><Search size={22} /></Button>
    </Block>
}




