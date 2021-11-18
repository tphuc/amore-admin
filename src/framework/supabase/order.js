

import useSWR from 'swr'
import { supabase } from '.'


const ENDPOINT = 'order'



const fetcher = async (ENDPOINT, filter) => {
    let ref = supabase.from(ENDPOINT).select('*')
    for(let k in filter){
        if(filter[k]){
            switch(k){
                default:
                    break;
                case 'name':
                    ref = ref.filter(k, 'like', `%${filter[k]}%`)
                    break
                case 'phone':
                    ref.filter(k, 'eq', filter[k])
                    break
                case 'paid':
                    ref.filter(k, 'eq', filter[k][0].value)
                    break
                case 'paymentMethod':
                    ref.filter(k, 'eq', filter[k][0].value)
                    break
            }
        }
    }

    let res = await ref
    console.log(res)
    return res.data
   
}

export default function useOrders(filter) {
    const { data, error, mutate } = useSWR([ENDPOINT, filter], fetcher)
    return {
        mutate,
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}

export const OrderCRUD = {
    create: async (data) => {
        let res = await supabase.from(ENDPOINT).insert(data)
        return res
    },
    createWithId: async (id, data) => {

    },
    read: async(id) => {
      
    },
    update: async (id, data) => {
        let res = await supabase.from(ENDPOINT).update(data).match({id})
        return res
    },
    delete: async (id) => {
        let res = await supabase.from(ENDPOINT).delete().match({id})
        return res
    },
}