'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type Pulse = {
  total_questionnaire_responses: number;
  total_supporters: number;
  public_supporters: number;
  total_signatures: number;
  pct_support_closing_cost: number;
  pct_support_fhfa_pilot: number;
};

function Card({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5">
      <div className="text-sm text-neutral-500">{label}</div>
      <div className="mt-2 text-3xl font-semibold">{value}</div>
    </div>
  );
}

export default function MarketPulse() {
  const [pulse, setPulse] = useState<Pulse | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('market_pulse_summary').select('*').single();
      setPulse(data || null);
    };
    load();
  }, []);

  return (
    <section className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Card label="Supporters #" value={pulse?.total_supporters ?? 0} />
        <Card label="Public backers #" value={pulse?.public_supporters ?? 0} />
        <Card label="Proposal signatures #" value={pulse?.total_signatures ?? 0} />
        <Card label="% Support closing cost" value={pulse ? `${pulse.pct_support_closing_cost}%` : '0%'} />
        <Card label="% Support FHFA pilot" value={pulse ? `${pulse.pct_support_fhfa_pilot}%` : '0%'} />
        <Card label="Questionnaire responses #" value={pulse?.total_questionnaire_responses ?? 0} />
      </div>
    </section>
  );
}
