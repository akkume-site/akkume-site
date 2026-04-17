import Link from 'next/link';
import Image from 'next/image';
import { navItems } from '@/lib/site-content';

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/akkume-logo.png"
            alt="Akkume"
            width={44}
            height={44}
            className="h-11 w-11 rounded-md object-contain"
            priority
          />
          <div>
            <div className="text-base font-semibold text-neutral-900">Akkume</div>
            <div className="text-xs text-neutral-500">Bitcoin reserve infrastructure for housing finance</div>
          </div>
        </Link>

        <nav className="hidden gap-2 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-full px-3 py-2 text-sm hover:bg-neutral-100">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
