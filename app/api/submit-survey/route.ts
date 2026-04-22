import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const rateMap = new Map<string,{count:number,reset:number}>();
function checkRate(ip:string){
  const now=Date.now();
  const e=rateMap.get(ip)||{count:0,reset:now+60000};
  if(now>e.reset){e.count=0;e.reset=now+60000;}
  e.count++;rateMap.set(ip,e);return e.count<=3;
}
function cleanObj(body:Record<string,unknown>){
  const out:Record<string,unknown>={};
  for(const[k,v]of Object.entries(body)){
    if(typeof v==='string')out[k]=v.replace(/<[^>]*>/g,'').trim().slice(0,2000);
    else if(typeof v==='number'&&isFinite(v))out[k]=v;
    else if(typeof v==='boolean')out[k]=v;
    else if(Array.isArray(v))out[k]=v.filter(i=>typeof i==='string').map(i=>String(i).slice(0,100)).slice(0,20);
  }
  return out;
}

export async function POST(req:NextRequest){
  const ip=req.headers.get('x-forwarded-for')?.split(',')[0]??'unknown';
  if(!checkRate(ip))return NextResponse.json({error:'Too many requests.'},{status:429});
  let body:Record<string,unknown>={};
  try{body=await req.json();}catch{return NextResponse.json({error:'Invalid JSON'},{status:400});}
  const level=parseInt(String(body.level))||1;
  if(![1,2].includes(level))return NextResponse.json({error:'Invalid level.'},{status:400});
  const email=typeof body.email==='string'?body.email.toLowerCase().trim().slice(0,254):'';
  const response_data=cleanObj(body);
  const now=new Date().toISOString();
  const supabase=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  const tierTable=level===1?'survey_responses_tier1':'survey_responses_tier2';
  await Promise.all([
    supabase.from('survey_responses').insert({level,response_data,email:email||null,created_at:now}),
    supabase.from(tierTable).insert({response_data,email:email||null,created_at:now}),
  ]);
  return NextResponse.json({success:true});
}
