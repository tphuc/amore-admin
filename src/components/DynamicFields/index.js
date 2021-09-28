import { Block } from 'baseui/block';
import { Input } from 'baseui/input';
import { Select } from 'baseui/select';
import { FileUploader } from "baseui/file-uploader";
import React from 'react';


const exampleFields = [
    {
        id: 'fieldA',
        type: "text",
        placeholder: "field A",

        defaultValue: 'Lorem ispum'
    },
    {
        id: 'fieldB',
        type: "select",
        placeholder: "Field B select",
        options: [
            {
                value: '1',
                label: "Option A"
            },
            {
                value: '2',
                label: "Option B"
            }
        ],
        // defaultValue: ['Lorem ispum'],
        props: {
            labelKey: 'label',
            valueKey: 'value'
        }
       
    },
    {
        id: "fieldC",
        type: "select-multiple",
        options: [
            {
                value: '1',
                label: "Option A"
            },
            {
                value: '2',
                label: "Option B"
            },
            {
                value: '3',
                label: "Option C"
            }
        ],
        placeholder: "Field C multiple select",
        props: {
            labelKey: 'label',
            valueKey: 'value'
        }
    },
    {
        id: "fieldD",
        type: "file",
        placeholder: "File",
        onDropAccepted: () => { },
        props: {
            labelKey: 'label',
            valueKey: 'value'
        }
    },


]



export default function DynamicFields({
    fields = exampleFields,
}) {

    const [data, setData] = React.useState({});


    // React.useEffect(() => {
    //     fields.map((item) => {
    //         setData(prev => ({
    //             ...prev,
    //             [item.id]: item.defaultValue
    //         }))
    //     })
    // }, [])

    const renderItem = (item, id) => {
        switch (item.type) {
            case 'text':
            default:
                return <Input 
                    placeholder={item.placeholder} 
                    value={data[item.id]} 
                    onChange={(e) => setData({...data, [item.id]: e.target.value})} 
                />
            case 'select':
                return <Select
                    
                    value={data[item.id]}
                    onChange={({ value }) => setData(prev => ({ ...prev, [item.id]: value }))}
                    options={item.options || []}
                    placeholder={item.placeholder || ''}
                    {...item.props}
                />
            case 'select-multiple':
                return <Select
                    
                    multi
                    value={data[item.id]}
                    onChange={({ value }) => setData(prev => ({ ...prev, [item.id]: value }))}
                    options={item.options || []}
                    placeholder={item.placeholder || ''}
                    {...item.props}
                />
            case 'file':
                return <FileUploader
                    onDropAccepted={item.onDropAccepted}
                    {...item.props}

                />
        }
    }

    return <Block>
        {
            fields.map((item, id) => <div key={id} style={{ marginTop: 5 }}>
                {renderItem(item, id)}
            </div>
            )
        }
    </Block>
}