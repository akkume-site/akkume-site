'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

const roles = ['Borrower', 'Lender', 'Investor', 'Servicer', 'Regulator', 'Strategic Partner', 'Other'];
const visibility = ['List publicly as a supporter', 'Keep private, add to backer count'];
const helpTypes = ['Actively join the push', 'Pledge resources', 'Request briefing', 'Media / policy support'];

export default function SupportPilotForm() {
  const [form, setForm] = useState({
    full_name: '',
    company: '',
    email: '',
    role_selected: '',
    support_visibility: '',
    help_types: [] as string[],
    contribution_text: '',
  });
  const [done, setDone] = useState(false);
  const [shareSlug, setShareSlug] = useState('');
  const [error, setError] = useState('');

  const toggleHelp = (item: string) => {
    setForm((prev) => ({
      ...prev,
      help_types: prev.help_types.includes(item)
        ? prev.help_types.filter((x) => x !== item)
        : [...prev.help_types, item],
    }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const { data, error } = await supabase
      .from('supporters')
      .insert([
        {
          ...form,
          is_public: form.support_visibility === 'List publicly as a supporter',
          support_statement: true,
        },
      ])
      .select('share_slug')
      .single();

    if (error) {
      setError(error.message);
      return;
    }

    setShareSlug(data.share_slug);
    setDone(true);
  };

  if (done) {
    const shareUrl =
      typeof window !== 'undefined' ? `${window.location.origin}/support?s=${shareSlug}` : '';
    return (
      <div className="rounded-3xl border border-neutral-200 bg-white p-6">
        <h2 className="text-2xl font-semibold">Support recorded</h2>
        <p className="mt-2 text-neutral-600">Thank you for supporting the pilot.</p>
        <p className="mt-3 break-all rounded-xl bg-neutral-100 p-3 text-sm">{shareUrl}</p>
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
        <div className="mb-2 text-sm font-medium">Select role</div>
        <div className="grid gap-2 sm:grid-cols-2">
          {roles.map((item) => (
            <label key={item} className="flex items-center gap-2 rounded-xl border p-3 text-sm">
              <input type="radio" name="role_selected" checked={form.role_selected === item} onChange={() => setForm({ ...form, role_selected: item })} />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-2 text-sm font-medium">Support visibility</div>
        <div className="grid gap-2">
          {visibility.map((item) => (
            <label key={item} className="flex items-center gap-2 rounded-xl border p-3 text-sm">
              <input type="radio" name="support_visibility" checked={form.support_visibility === item} onChange={() => setForm({ ...form, support_visibility: item })} />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-2 text-sm font-medium">How would you like to help?</div>
        <div className="grid gap-2 sm:grid-cols-2">
          {helpTypes.map((item) => (
            <label key={item} className="flex items-center gap-2 rounded-xl border p-3 text-sm">
              <input type="checkbox" checked={form.help_types.includes(item)} onChange={() => toggleHelp(item)} />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </div>

      <textarea
        className="min-h-[120px] w-full rounded-xl border px-4 py-3"
        placeholder="How would you like to support or contribute?"
        value={form.contribution_text}
        onChange={(e) => setForm({ ...form, contribution_text: e.target.value })}
      />

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <button className="inline-flex min-h-11 items-center justify-center rounded-full bg-neutral-900 px-5 py-3 text-sm font-medium text-white">
        Submit support
      </button>
    </form>
  );
}
