

import useSWR from 'swr'
import { supabase } from '.'


const ENDPOINT = 'brands'



const fetcher = async (ENDPOINT) => {
    let res = await supabase.from(ENDPOINT).select('*')
    return res.data
   
}

export default function useCategories() {
    const { data, error, mutate } = useSWR(ENDPOINT, fetcher)
    return {
        mutate,
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}

export const BrandsCRUD = {
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

    },
}