import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

async function testOrder() {
  const orderId = `RHA-${Math.floor(10000 + Math.random() * 90000)}`;
  
  const testPayload = {
    name: "Test User",
    phone: "01XXXXXXXXX",
    address: "Test Address",
    delivery_type: "Inside Dhaka",
    quantity: 1,
    total_price: 500,
    variant: "Bridal Cone (Standard)",
    order_id: orderId,
    status: "Verified"
  };

  console.log("Inserting payload:", testPayload);

  const { data, error } = await supabaseAdmin
    .from('orders')
    .insert([testPayload])
    .select();

  if (error) {
    console.error("🔴 ERROR DETAILS:");
    console.error(JSON.stringify(error, null, 2));
  } else {
    console.log("🟢 SUCCESS!");
    console.log(data);
  }
}

testOrder();
