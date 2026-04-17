import { institutionsCopy } from '@/lib/site-content';

export default function InstitutionsPage() {
  return (
    <main className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6">
      <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10">
        <div className="text-sm text-neutral-500">It’s not too late to Akkume-ulate Bitcoin</div>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">{institutionsCopy.hero}</h1>
        <p className="mt-3 text-xl text-neutral-700">{institutionsCopy.hero2}</p>

        <div className="mt-6 space-y-3 text-neutral-700">
          {institutionsCopy.lead.map((item) => <p key={item}>{item}</p>)}
        </div>

        <div className="mt-8 overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-3 text-left">FHFA Objective</th>
                <th className="py-3 text-left">Fit: Fixed Supply Asset Bitcoin Reserve</th>
              </tr>
            </thead>
            <tbody>
              {institutionsCopy.fitRows.map(([left, right]) => (
                <tr key={left} className="border-b">
                  <td className="py-3 pr-6">{left}</td>
                  <td className="py-3">{right}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="mt-8 text-2xl font-semibold">Pilot program initiatives for industry standards</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-neutral-700">
          {institutionsCopy.initiatives.map((item) => <li key={item}>{item}</li>)}
        </ul>

        <h2 className="mt-8 text-2xl font-semibold">Proof of weakness</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-neutral-700">
          {institutionsCopy.fragility.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>
    </main>
  );
}
