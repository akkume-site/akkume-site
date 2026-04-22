import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export const revalidate = 30;

export async function GET(){
  const supabase=createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const[{data:counts},{data:cards}]=await Promise.all([
    supabase.from('public_supporters').select('*').limit(1),
    supabase.from('visible_public_supporters')
      .select('id,full_name,company,role,notes,created_at')
      .order('created_at',{ascending:false}).limit(20),
  ]);
  const c=counts?.[0]??{};
  return NextResponse.json({
    counts:{
      total_count:c.total_count??c.total??0,
      public_count:c.public_count??c.public??0,
      private_count:c.private_count??c.private??0,
    },
    cards:(cards??[]).map((r:Record<string,unknown>)=>({
      id:r.id,
      name:r.full_name,
      role:r.role,
      company:r.company,
      message:r.notes,
      created_at:r.created_at,
    })),
  });
}
