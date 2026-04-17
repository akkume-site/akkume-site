import SignProposalForm from '@/components/SignProposalForm';
import { pilotProposalCopy } from '@/lib/site-content';

export default function PilotProposalPage() {
  return (
    <main className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6">
      <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10">
        <h1 className="text-4xl font-semibold tracking-tight">Pilot Proposal</h1>
        <p className="mt-4 text-neutral-700">{pilotProposalCopy.intro}</p>
        <p className="mt-3 text-neutral-700">{pilotProposalCopy.intro2}</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {pilotProposalCopy.bullets.map((item) => (
            <div key={item} className="rounded-xl border border-neutral-200 p-4 text-sm">{item}</div>
          ))}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {pilotProposalCopy.benefits.map((item) => (
            <div key={item} className="rounded-xl bg-neutral-100 p-4 text-sm">{item}</div>
          ))}
        </div>

        <h2 className="mt-8 text-2xl font-semibold">What this changes</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-neutral-700">
          {pilotProposalCopy.changes.map((item) => <li key={item}>{item}</li>)}
        </ul>

        <h2 className="mt-8 text-2xl font-semibold">How it works</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-neutral-700">
          {pilotProposalCopy.howItWorks.map((item) => <li key={item}>{item}</li>)}
        </ul>

        <h2 className="mt-8 text-2xl font-semibold">Why FHFA</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-neutral-700">
          {pilotProposalCopy.whyFhfa.map((item) => <li key={item}>{item}</li>)}
        </ul>

        <h2 className="mt-8 text-2xl font-semibold">The second-order effect</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-neutral-700">
          {pilotProposalCopy.secondOrder.map((item) => <li key={item}>{item}</li>)}
        </ul>

        <div className="mt-8 rounded-xl bg-neutral-100 p-5">
          <div className="text-xl font-semibold">Bottom line</div>
          <p className="mt-2 text-neutral-700">
            Don’t just finance homes. Fortify the system that finances them.
            This is how to turn the largest credit market in the world into a more resilient, more affordable, Bitcoin-aligned system.
          </p>
        </div>
      </section>

      <SignProposalForm />
    </main>
  );
}
