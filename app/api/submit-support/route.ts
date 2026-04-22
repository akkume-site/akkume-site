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
const ROLES=['Borrower','Lender','Investor','Servicer','Regulator','Strategic Partner','Trade Association','Researcher / Academic','Other'];
const VIS=['public','private'];
const HELP=['Actively join the push','Pledge resources','Request a briefing','Media / policy support','Sign in principle only'];

export async function POST(req:NextRequest){
  const ip=req.headers.get('x-forwarded-for')?.split(',')[0]??'unknown';
  if(!checkRate(ip))return NextResponse.json({error:'Too many requests.'},{status:429});
  let body:Record<string,unknown>={};
  try{body=await req.json();}catch{return NextResponse.json({error:'Invalid JSON'},{status:400});}
  const full_name=clean(body.name??body.full_name,120);
  const email=clean(body.email,254).toLowerCase();
  const company=clean(body.company,200);
  const phone=clean(body.phone,20);
  const role=clean(body.role,100);
  const visibility=clean(body.visibility,10);
  const help_type=clean(body.how_to_help??body.help_type,100);
  const notes=clean(body.message??body.notes,1000);
  if(full_name.length<2)return NextResponse.json({error:'Name required.'},{status:400});
  if(!validEmail(email))return NextResponse.json({error:'Valid email required.'},{status:400});
  if(!ROLES.includes(role))return NextResponse.json({error:'Invalid role.'},{status:400});
  if(!VIS.includes(visibility))return NextResponse.json({error:'Invalid visibility.'},{status:400});
  if(!HELP.includes(help_type))return NextResponse.json({error:'Invalid help type.'},{status:400});
  const supabase=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  const {error}=await supabase.from('supporters').insert({
    full_name,email,company,phone:phone||null,role,visibility,
    help_type,notes,time:new Date().toISOString()
  });
  if(error){
    if(error.code==='23505')return NextResponse.json({error:'Email already submitted.'},{status:409});
    console.error('[submit-support]',error.message);
    return NextResponse.json({error:'Submission failed.'},{status:500});
  }
  return NextResponse.json({success:true});
}
