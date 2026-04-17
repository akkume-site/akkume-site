import MarketPulse from '@/components/MarketPulse';
import PublicSupporters from '@/components/PublicSupporters';

export default function MarketPulsePage() {
  return (
    <main className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6">
      <section className="space-y-3">
        <div className="text-sm font-medium uppercase tracking-[0.18em] text-amber-600">Market Pulse</div>
        <h1 className="text-4xl font-semibold tracking-tight">Help shape the future of mortgage resilience</h1>
        <p className="max-w-3xl text-neutral-600">
          Live supporter count, public backers, proposal signatures, and policy sentiment from the market.
        </p>
      </section>

      <MarketPulse />
      <PublicSupporters />
    </main>
  );
}
