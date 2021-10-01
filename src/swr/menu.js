

import useSWR from 'swr'

const fetcher = (...args) => {
    return Promise.resolve([

        {
            name:'Danh mục',
            path:'/category'
        },
        {
            name:'Nhãn hiệu',
            path:'/brand'
        },
        {
            name:'San pham',
            path: '/product'
        },
        {
            name: "Đơn đặt",
            path: '/order'
        },
        {
            name: "Người dùng",
            path: '/user'
        },
        
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
