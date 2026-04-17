'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

const signerTypes = ['Individual supporter', 'Strategic partner', 'Institutional contact'];

export default function SignProposalForm() {
  const [form, setForm] = useState({
    full_name: '',
    company: '',
    email: '',
    signer_type: '',
  });
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const { error } = await supabase.from('proposal_signatures').insert([
      {
        ...form,
        agrees_to_statement: true,
        is_public: true,
      },
    ]);

    if (error) {
      setError(error.message);
      return;
    }

    setDone(true);
  };

  if (done) {
    return (
      <div className="rounded-3xl border border-neutral-200 bg-white p-6">
        <h2 className="text-2xl font-semibold">Proposal signed</h2>
        <p className="mt-2 text-neutral-600">Thank you for supporting the pilot proposal and proposed standards / rule changes.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5 rounded-3xl border border-neutral-200 bg-white p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <input className="min-h-11 rounded-xl border px-4 py-3" placeholder="Full name" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
        <input className="min-h-11 rounded-xl border px-4 py-3" placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
        <input className="min-h-11 rounded-xl border px-4 py-3 sm:col-span-2" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      </div>

      <div>
        <div className="mb-2 text-sm font-medium">Signer type</div>
        <div className="grid gap-2">
          {signerTypes.map((item) => (
            <label key={item} className="flex items-center gap-2 rounded-xl border p-3 text-sm">
              <input type="radio" name="signer_type" checked={form.signer_type === item} onChange={() => setForm({ ...form, signer_type: item })} />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-neutral-100 p-4 text-sm">
        I support the pilot proposal and proposed standards / rule changes.
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <button className="inline-flex min-h-11 items-center justify-center rounded-full bg-neutral-900 px-5 py-3 text-sm font-medium text-white">
        Sign proposal
      </button>
    </form>
  );
}
