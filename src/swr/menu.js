

import useSWR from 'swr'
import {AiOutlineAppstore, AiOutlineCrown, AiOutlineContainer, AiOutlineDatabase} from 'react-icons/ai'

const fetcher = (...args) => {
    return Promise.resolve([

        {
            name:'Danh mục',
            icon: AiOutlineAppstore,
            path:'/category'
        },
        {
            icon: AiOutlineCrown,
            name:'Nhãn hiệu',
            path:'/brand'
        },
        {
            icon: AiOutlineDatabase,
            name:'Sản phẩm',
            path: '/product'
        },
        {

            icon: AiOutlineContainer,
            name: "Đơn đặt",
            path: '/orders'
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
