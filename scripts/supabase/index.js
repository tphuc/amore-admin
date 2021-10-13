const  { createClient } = require('@supabase/supabase-js')


const SUPABASE_URL = 'https://lzbanyqxakzvfzaiwjkp.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNDAyMjg0OSwiZXhwIjoxOTQ5NTk4ODQ5fQ.L3MfGtD1yUKi1Igtcqoe4kvMGuZuf3_zrGpY9jIwAxc'


const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)


const collection = 'products'
const _data = require(`../${collection}.json`);
const data = _data.map(item => {
    const {id,  ...fields} = item;
    return {
        label: fields.label,
        low_price: fields.price,
        variants: fields.variants,
        origin: fields.origin?.map(item => item.label).join(','),
        style:  fields.style?.map(item => item.label).join(','),
        introduction: fields.introduction,
        gender: fields.gender?.map(item => item.label).join(','),
        images: fields.images.map(item => ({ url: item.name })),
        temp: Object.values(fields.brands)[0].label
    }
})


console.log(data)

async function execute(name){

    let res = await supabase.from('categories').select('id').match()

    // let res = await supabase.from(name).insert(data)
    // console.log(res)
}


// execute('products')

