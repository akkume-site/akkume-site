import { borrowerCopy } from '@/lib/site-content';

export default function BorrowerPage() {
  return (
    <main className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6">
      <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10">
        <div className="text-sm text-neutral-500">It’s not too late to Akkume-ulate Bitcoin</div>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">{borrowerCopy.header}</h1>
        <p className="mt-3 text-xl text-neutral-700">{borrowerCopy.subheader}</p>

        <div className="mt-6 space-y-3 text-neutral-700">
          {borrowerCopy.body.map((item) => <p key={item}>{item}</p>)}
        </div>

        <div className="mt-8 overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-3 text-left">FHFA Objective</th>
                <th className="py-3 text-left">Fit: Fixed Supply Bitcoin Reserve</th>
              </tr>
            </thead>
            <tbody>
              {borrowerCopy.fitRows.map(([left, right]) => (
                <tr key={left} className="border-b">
                  <td className="py-3 pr-6">{left}</td>
                  <td className="py-3">{right}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
