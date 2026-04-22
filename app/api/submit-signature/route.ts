import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const rateMap = new Map<string,{count:number,reset:number}>();
function checkRate(ip:string){
  const now=Date.now();
  const e=rateMap.get(ip)||{count:0,reset:now+60000};
  if(now>e.reset){e.count=0;e.reset=now+60000;}
  e.count++;rateMap.set(ip,e);return e.count<=5;
}
function clean(v:unknown,max:number){
  return typeof v==='string'?v.replace(/<[^>]*>/g,'').trim().slice(0,max):'';
}
function validEmail(e:string){
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)&&e.length<=254;
}
const VALID_TYPES=['Individual supporter','Strategic partner','Institutional contact'];

export async function POST(req:NextRequest){
  const ip=req.headers.get('x-forwarded-for')?.split(',')[0]??'unknown';
  if(!checkRate(ip))return NextResponse.json({error:'Too many requests.'},{status:429});
  let body:Record<string,unknown>={};
  try{body=await req.json();}catch{return NextResponse.json({error:'Invalid JSON'},{status:400});}
  const full_name=clean(body.name??body.full_name,120);
  const email=clean(body.email,254).toLowerCase();
  const company=clean(body.company,200);
  const signer_type=clean(body.signer_type,100);
  if(full_name.length<2)return NextResponse.json({error:'Name required.'},{status:400});
  if(!validEmail(email))return NextResponse.json({error:'Valid email required.'},{status:400});
  if(!VALID_TYPES.includes(signer_type))return NextResponse.json({error:'Invalid signer type.'},{status:400});
  const supabase=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  const {error}=await supabase.from('signatures').insert({
    full_name,email,company,signer_type,time:new Date().toISOString()
  });
  if(error){
    if(error.code==='23505')return NextResponse.json({error:'Already signed.'},{status:409});
    console.error('[submit-signature]',error.message);
    return NextResponse.json({error:'Submission failed.'},{status:500});
  }
  return NextResponse.json({success:true});
}
