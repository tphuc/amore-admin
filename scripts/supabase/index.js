const  { createClient } = require('@supabase/supabase-js')


const SUPABASE_URL = 'https://lzbanyqxakzvfzaiwjkp.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNDAyMjg0OSwiZXhwIjoxOTQ5NTk4ODQ5fQ.L3MfGtD1yUKi1Igtcqoe4kvMGuZuf3_zrGpY9jIwAxc'


const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)


const collection = 'products'
const _data = require(`../${collection}.json`);
// const data = _data.map(item => {
//     const {id,  ...fields} = item;
//     return {
//         ...fields
//     }
// })




async function execute(name){

    // let products = await (await supabase.from('products').select('*')).data
    // let categories = await (await supabase.from('categories').select('*')).data
    // for(let product of products){
    //     let product_cates = product.temp
        
    //     let cate_res = await supabase.from('product_category').insert(product_cates.map(item => ({
    //         product_id: product.id,
    //         category_id: categories.find(c => c.label === item.label).id
    //     })))
    // }
    // let res = await supabase.from('categories').select('id').match()

    // let res = await supabase.from(name).insert(data)
    // console.log(res)
}


execute('products')

