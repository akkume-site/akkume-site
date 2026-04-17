import Link from 'next/link';
import MarketPulse from '@/components/MarketPulse';
import { landingCopy } from '@/lib/site-content';

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-10">
        <div className="max-w-3xl space-y-4">
          <div className="text-sm font-medium uppercase tracking-[0.18em] text-amber-600">
            {landingCopy.eyebrow}
          </div>
          <div className="text-sm text-neutral-500">{landingCopy.kicker}</div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {landingCopy.title}
          </h1>
          <p className="text-lg text-neutral-700">{landingCopy.subtitle}</p>

          {landingCopy.paragraphs.map((p) => (
            <p key={p} className="text-neutral-700">{p}</p>
          ))}

          <div className="flex flex-col gap-3 pt-3 sm:flex-row">
            <Link href="/pilot-proposal" className="inline-flex min-h-11 items-center justify-center rounded-full bg-neutral-900 px-5 py-3 text-sm font-medium text-white">
              See pilot proposal
            </Link>
            <Link href="/support" className="inline-flex min-h-11 items-center justify-center rounded-full border border-neutral-300 px-5 py-3 text-sm font-medium">
              Sign up to support
            </Link>
          </div>
        </div>
      </section>

      <div className="mt-8">
        <MarketPulse />
      </div>
    </main>
  );
}
