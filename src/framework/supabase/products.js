

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
    
        const { categories, images, ...data} = _data;
        
        // upload images to storages and retrieve urls
        let imgagesRes = await Promise.all(images?.map(async file => {

            if (!(file instanceof File) ) {
                return file  
            }
            else {
                let res = await supabase.storage.from('amore').upload(`${file.name}`, file)
                console.log(51, res)
                let { publicURL } = await supabase.storage.from('amore').getPublicUrl(`${file.name}`)
                return {
                    name: `${file.name}`,
                    url: publicURL
                }
            }
            

        }))
        console.log('image upload', imgagesRes)
        // create a new product row
        let res = await supabase.from(ENDPOINT).insert({
            images: imgagesRes,
            ...data
        })

        console.log(59, res)
        // insert categories to many to many tables
        await supabase.from('product_category').insert(categories?.map(item => ({
            product: res.data[0]?.id,
            category: item.id
        })))
        
  
        return res
    },
    createWithId: async (id, data) => {
 
    },
    read: async(id) => {
      
    },
    update: async (id, _data) => {
        // delete and rewrite categories
        const { categories, images, ...data} = _data
        if(categories?.length){
            let del_res = await supabase.from('product_category').delete().match({product: id})
            let cate_res = await supabase.from('product_category').insert(categories.map(item => ({
                product: id,
                category: item.id
            })))
        }

        let imgagesRes = await Promise.all(images?.map(async file => {
            if (!(file instanceof File) ) {
                return file  
            }
            else {
                let res = await supabase.storage.from('amore').upload(`${file.name}`, file)
                console.log(51, res)
                let { publicURL } = await supabase.storage.from('amore').getPublicUrl(`${file.name}`)
                return {
                    name: `${file.name}`,
                    url: publicURL
                }
            }
            
        }))
       
        let res = await supabase.from(ENDPOINT).update({
            images: imgagesRes,
            ...data
        }).match({id})
        return res
    },
    delete: async (id) => {
        let del_res = await supabase.from('product_category').delete().match({product_id: id})
        let res = await supabase.from(ENDPOINT).delete().match({id})
        return res
    },
}