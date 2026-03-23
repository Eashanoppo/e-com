const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

async function run() {
  const orderId = `RHA-${Math.floor(10000 + Math.random() * 90000)}`;
  
  const payload = {
    name: "John Doe",
    phone: "01700000000",
    address: "123 Dhaka",
    delivery_type: "Inside Dhaka",
    quantity: 1,
    total_price: 500.0,
    variant: "Test Item",
    order_id: orderId,
    status: "Verified"
  };

  const { error } = await supabaseAdmin.from('orders').insert([payload]);
  
  if (error) {
    console.log("DB_ERROR_MESSAGE:", error.message);
    console.log("DB_ERROR_DETAILS:", JSON.stringify(error, null, 2));
  } else {
    console.log("SUCCESS");
  }
}
run();
