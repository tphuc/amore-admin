const { createClient } = require('@supabase/supabase-js')

const REACT_APP_SUPABASE_URL = 'https://nemnumqnxvavvdsrdutw.supabase.co'
const REACT_APP_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODI3OTMwNiwiZXhwIjoxOTUzODU1MzA2fQ.QINrokq_JB4i8ZN8eo_SrhOuLlTunk03SAk69d41g88'

const supabase = createClient(REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_ANON_KEY)
