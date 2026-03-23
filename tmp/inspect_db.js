const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

async function inspectTable() {
    // Query information_schema to see actual columns
    const { data, error } = await supabaseAdmin
        .rpc('get_table_columns', { table_name: 'orders' });

    if (error) {
        // Fallback: try a direct query and check the error message or data keys
        const { data: sample, error: sampleError } = await supabaseAdmin
            .from('orders')
            .select('*')
            .limit(1);
        
        if (sampleError) {
            console.error("COULD NOT QUERY TABLE:", sampleError.message);
        } else {
            console.log("ACTUAL COLUMNS FOUND:", Object.keys(sample[0] || {}));
        }
    } else {
        console.log("COLUMNS:", data);
    }
}

inspectTable();
