'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

const industries = [
  'Bank / Credit Union',
  'Mortgage Lender / Originator',
  'Servicer',
  'Investor / Asset Manager',
  'Builder / Developer',
  'Technology Provider',
  'Policy / Government',
  'Bitcoin / Digital Asset Company',
  'Individual',
];

const roles = ['Decision-maker', 'Influencer', 'Research / Observer'];

const barriers = [
  'High monthly payments',
  'Lack of savings / reserves',
  'Down payment constraints',
  'Credit qualification limits',
  'Early loan default risk',
  'System risk to lenders / taxpayers',
];

export default function Tier1Questionnaire() {
  const [form, setForm] = useState({
    respondent_name: '',
    email: '',
    company: '',
    industry: '',
    role_level: '',
    biggest_barriers: [] as string[],
    reserve_improves_resilience: '',
    reserve_as_closing_cost: '',
    support_fhfa_pilot: '',
    consider_pilot_participation: '',
    is_public_supporter: false,
    consent_to_contact: false,
  });
  const [tier1Id, setTier1Id] = useState('');
  const [error, setError] = useState('');

  const toggleBarrier = (item: string) => {
    const current = form.biggest_barriers;
    if (current.includes(item)) {
      setForm({ ...form, biggest_barriers: current.filter((x) => x !== item) });
      return;
    }
    if (current.length < 2) {
      setForm({ ...form, biggest_barriers: [...current, item] });
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const { data, error } = await supabase
      .from('survey_responses_tier1')
      .insert([{ ...form, user_agent: typeof window !== 'undefined' ? navigator.userAgent : null }])
      .select('id')
      .single();

    if (error) {
      setError(error.message);
      return;
    }

    setTier1Id(data.id);
  };

  if (tier1Id) {
    return (
      <div className="space-y-4 rounded-3xl border border-neutral-200 bg-white p-6">
        <h2 className="text-2xl font-semibold">Thank you.</h2>
        <p>You’re in the early supporter group. Continue to Tier 2 to help shape the pilot.</p>
        <Link href={`/questionnaire?tier=2&tier1=${tier1Id}`} className="inline-flex min-h-11 items-center justify-center rounded-full bg-neutral-900 px-5 py-3 text-sm font-medium text-white">
          Continue to Tier 2
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5 rounded-3xl border border-neutral-200 bg-white p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <input className="min-h-11 rounded-xl border px-4 py-3" placeholder="Name" value={form.respondent_name} onChange={(e) => setForm({ ...form, respondent_name: e.target.value })} />
        <input className="min-h-11 rounded-xl border px-4 py-3" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      </div>

      <input className="min-h-11 w-full rounded-xl border px-4 py-3" placeholder="Company / Organization" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />

      <select className="min-h-11 w-full rounded-xl border px-4 py-3" value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} required>
        <option value="">Industry</option>
        {industries.map((item) => <option key={item}>{item}</option>)}
      </select>

      <div className="grid gap-2">
        {roles.map((item) => (
          <label key={item} className="flex items-center gap-2 rounded-xl border p-3 text-sm">
            <input type="radio" name="role" checked={form.role_level === item} onChange={() => setForm({ ...form, role_level: item })} />
            <span>{item}</span>
          </label>
        ))}
      </div>

      <div className="grid gap-2">
        {barriers.map((item) => (
          <label key={item} className="flex items-center gap-2 rounded-xl border p-3 text-sm">
            <input type="checkbox" checked={form.biggest_barriers.includes(item)} onChange={() => toggleBarrier(item)} />
            <span>{item}</span>
          </label>
        ))}
      </div>

{[
  {
    label: 'Does adding a borrower-owned reserve asset improve mortgage resilience?',
    key: 'reserve_improves_resilience' as const,
    options: ['Yes', 'No', 'Unsure'],
  },
  {
    label: 'Should a borrower-funded reserve qualify as a closing cost?',
    key: 'reserve_as_closing_cost' as const,
    options: ['Yes', 'No', 'Unsure'],
  },
  {
    label: 'Do you support a pilot program through FHFA?',
    key: 'support_fhfa_pilot' as const,
    options: ['Yes', 'No', 'Need more information'],
  },
  {
    label: 'Would you or your organization consider participating in a pilot?',
    key: 'consider_pilot_participation' as const,
    options: ['Yes', 'Maybe', 'No'],
  },
].map((field) => (
  <div key={field.key}>
    <div className="mb-2 text-sm font-medium">{field.label}</div>
    <div className="grid gap-2">
      {field.options.map((item) => (
        <label key={item} className="flex items-center gap-2 rounded-xl border p-3 text-sm">
          <input
            type="radio"
            name={field.key}
            checked={form[field.key] === item}
            onChange={() => setForm({ ...form, [field.key]: item })}
          />
          <span>{item}</span>
        </label>
      ))}
    </div>
  </div>
))}

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={form.is_public_supporter} onChange={(e) => setForm({ ...form, is_public_supporter: e.target.checked })} />
        <span>I am open to being listed as a public supporter.</span>
      </label>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={form.consent_to_contact} onChange={(e) => setForm({ ...form, consent_to_contact: e.target.checked })} />
        <span>You may contact me for pilot and policy follow-up.</span>
      </label>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <button className="inline-flex min-h-11 items-center justify-center rounded-full bg-neutral-900 px-5 py-3 text-sm font-medium text-white">
        Submit & View Results
      </button>
    </form>
  );
}
