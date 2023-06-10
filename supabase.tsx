import { createClient } from '@supabase/supabase-js';
const supabaseAdmin = createClient(
    'supabase url',
    'supabase keys'
);

export const addDataToDB = async(data:any)=>{
    const { error } = await supabaseAdmin
    .from('Develop')
    .insert(data)
    if(error){
        return "error"
    }else{
        return "succss"
    }
}