import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY

console.log(SUPABASE_URL, SUPABASE_ANON_KEY, process.env)
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export {
    supabase
}