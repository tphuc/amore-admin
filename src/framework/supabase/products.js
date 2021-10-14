

import useSWR from 'swr'
import { supabase } from '.'


const ENDPOINT = 'products'



const fetcher = async (ENDPOINT, filter) => {
    let res = await supabase.from(ENDPOINT)
    .select(`*, 
        brand: brands(
            *
        ),
        categories(
            *
        )
    `)
    .like('label', `%${filter.label || ''}%`)

    return res.data
   
}

export default function useCategories(filter) {
    const { data, error, mutate } = useSWR([ENDPOINT, filter], fetcher)
    return {
        mutate,
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}

export const ProductsCRUD = {
    create: async (_data) => {
        // delete and rewrite categories
        const { categories, ...data} = _data
        let res = await supabase.from(ENDPOINT).insert(data)

        if(categories?.length){
            let cate_res = await supabase.from('product_category').insert(categories.map(item => ({
                product_id: res.data[0].id,
                category_id: item.id
            })))
        }
        return res
    },
    createWithId: async (id, data) => {
 
    },
    read: async(id) => {
      
    },
    update: async (id, _data) => {
        // delete and rewrite categories
        const { categories, ...data} = _data
        if(categories?.length){
            let del_res = await supabase.from('product_category').delete().match({product_id: id})
            let cate_res = await supabase.from('product_category').insert(categories.map(item => ({
                product_id: id,
                category_id: item.id
            })))
        }
       
        let res = await supabase.from(ENDPOINT).update(data).match({id})
        return res
    },
    delete: async (id) => {
        let del_res = await supabase.from('product_category').delete().match({product_id: id})
        let res = await supabase.from(ENDPOINT).delete().match({id})
        return res
    },
}