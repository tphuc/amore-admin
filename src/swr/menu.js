

import useSWR from 'swr'

const fetcher = (...args) => {
    return Promise.resolve([
        {
            name: "Quản lí chung",
            children: [
                {
                    name:'Danh muc',
                    path:'/category'
                },
                {
                    name:'Hang',
                    path:'/brand'
                }
            ]
            
        },
        {
            name:'San pham',
            path: '/products'
        }
        
    ])
}


export default function useMenu() {
    const { data, error } = useSWR(`/menu`, fetcher)

    return {
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}
