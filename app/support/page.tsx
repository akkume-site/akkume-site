import SupportPilotForm from '@/components/SupportPilotForm';
import PublicSupporters from '@/components/PublicSupporters';

export default function SupportPage() {
  return (
    <main className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6">
      <section className="space-y-3">
        <div className="text-sm font-medium uppercase tracking-[0.18em] text-amber-600">Support the pilot</div>
        <h1 className="text-4xl font-semibold tracking-tight">Support the pilot</h1>
        <p className="max-w-3xl text-neutral-600">
          Actively join the push, pledge resources, request a briefing, or offer media / policy support.
        </p>
      </section>

      <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <SupportPilotForm />
        <PublicSupporters />
      </div>
    </main>
  );
}
