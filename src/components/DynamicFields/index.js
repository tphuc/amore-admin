import { Block } from 'baseui/block';
import { Input } from 'baseui/input';
import { Select } from 'baseui/select';
import { FileUploader } from "baseui/file-uploader";
import React from 'react';
import { Button } from 'baseui/button';
import { useStyletron } from 'baseui';



const getImageLabel = ({ option }) => {
    console.log('option', option.name)
    return option && (
        <>
            <img alt={''} width='auto' height='200px' style={{objectFit:"scale-down", objectPosition:"center"}} 
            src={ option instanceof File ? URL.createObjectURL(option) : option.name } 
            />
        </>
    );
};


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
    actionText = 'Xác nhận',
    onAction = (state) => { }
}) {

    const[_, theme] = useStyletron();
    const [data, setData] = React.useState({});



    React.useEffect(() => {
        fields?.map((item) => {
            // if(item.type === 'file'){
            //     item.defaultValue?.then(res => {
            //         setData(prev => ({
            //             ...prev,
            //             [item.id]: res
            //         }))
            //     })
   
            // }
          
            setData(prev => ({
                ...prev,
                [item.id]: item.defaultValue
            }))
        })
    }, [])



    const renderItem = (_item, id) => {
        let item = _item;
    
        
        switch (item.type) {
            case 'text':
            default:
                return <Input
                    placeholder={item.placeholder}
                    value={data[item.id]}
                    onChange={(e) => setData({ ...data, [item.id]: e.target.value })}
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
                return <>
                    <FileUploader
                        multiple={item.multiple}
                        onDropAccepted={(data) => setData(prev => ({ ...prev, [item.id]: item.defaultValue ? [...item.defaultValue, ...data] : data  }))}
                        {...item.props}
                    />
                    <Block height={'5px'}/>
                    <Select
                        overrides={{
                            ValueContainer: {
                                style: ({ $theme }) => ({
                                   
                                    display:"flex",
                                    flexDirection:"column",
                                    height: 'auto'
                                })
                            },
 
                            Tag: {
                                props: {
                                    overrides: {
                                        Root: {
                                            style: ({ $theme }) => ({
                                                display:"flex",
                                                flexDirection:"row",
                                                height: "200px",
                                                padding:'10px',
                                                width:"80%",
                                                borderRadius:0,
                                                backgroundColor: theme.colors.backgroundTertiary
                                            })
                                        },
                                        StartEnhancerContainer: {
                                            style: ({ $theme }) => ({
                                              width:"0px"
                                            })
                                          },
                                        Text: {
 
                                            style: ({ $theme }) => ({
                                                flex:1,
                                                display:"flex",
                                                justifyContent:"center",
                                                maxWidth:"unset",
                                                height: "auto",
                                                width:"200px",
                                               
                                            }),
                                            
                                        },
                                        ActionIcon: {
                                            props: {
                                                overrides: {
                                                  Svg: {
                                                    style: ({ $theme }) => ({
                                                      fill:  theme.colors.backgroundInv
                                                    })
                                                  }
                                                }
                                              }
                                        }

                                    }
                                }
                            }
                        }}
                        multi={item.multiple}
                        creatable
                        // deleteRemoves={true}
                        value={data[item.id]}
                        onChange={({ value }) => {

                             setData(prev => ({ ...prev, [item.id]: value })) 
                        }}
                        options={item.options || []}
                        placeholder={item.placeholder || ''}
                        getValueLabel={getImageLabel}
                        {...item.props}
                    />
                </>

        }
    }

    return <Block>
        {
            fields.map((item, id) => <div key={id} style={{ marginTop: 5 }}>
                {renderItem(item, id)}
            </div>
            )
        }

        <Block height={'10px'} />
        <Button onClick={() => {
            onAction(data)
        }}>{actionText}</Button>
    </Block>
}