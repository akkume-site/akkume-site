import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ALLOWED_ORIGINS=['https://akkume.com','https://www.akkume.com'];
const DANGEROUS=[/__proto__/i,/constructor\[/i,/prototype\[/i,/\.\.\//,/%2e%2e/i];

export function middleware(req:NextRequest){
  const url=req.url;
  for(const p of DANGEROUS){
    if(p.test(url))return new NextResponse('Bad Request',{status:400});
  }
  const{pathname}=req.nextUrl;
  const method=req.method;
  if(pathname.startsWith('/api/')&&['POST','PUT','DELETE','PATCH'].includes(method)){
    const origin=req.headers.get('origin')||'';
    if(origin&&!ALLOWED_ORIGINS.includes(origin)){
      const host=req.headers.get('host')||'';
      if(!host.endsWith('.vercel.app')&&!host.includes('localhost')){
        return new NextResponse('Forbidden',{status:403});
      }
    }
  }
  const res=NextResponse.next();
  res.headers.set('X-Frame-Options','DENY');
  res.headers.set('X-Content-Type-Options','nosniff');
  res.headers.set('Referrer-Policy','strict-origin-when-cross-origin');
  res.headers.set('Strict-Transport-Security','max-age=31536000; includeSubDomains; preload');
  return res;
}

export const config={
  matcher:['/((?!_next/static|_next/image|favicon.ico).*)'],
};
