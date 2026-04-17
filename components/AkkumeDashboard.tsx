'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type Metric = {
  metric_key: string;
  metric_label: string;
  metric_value: number;
  metric_suffix: string | null;
  extra_label: string | null;
};

function Card({ title, value, note }: { title: string; value: string; note?: string | null }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5">
      <div className="text-sm text-neutral-500">{title}</div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
      {note ? <div className="mt-1 text-sm text-neutral-500">{note}</div> : null}
    </div>
  );
}

export default function AkkumeDashboard() {
  const [metrics, setMetrics] = useState<Metric[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('dashboard_metrics')
        .select('metric_key, metric_label, metric_value, metric_suffix, extra_label')
        .eq('metric_group', 'akkume_ulate_bitcoin')
        .order('created_at');

      setMetrics(data || []);
    };

    load();
  }, []);

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-semibold">Akkume-ulate Bitcoin</h1>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {metrics.map((m) => (
          <Card
            key={m.metric_key}
            title={m.metric_label}
            value={`${Number(m.metric_value).toLocaleString()}${m.metric_suffix || ''}`}
            note={m.extra_label}
          />
        ))}
      </div>
    </section>
  );
}
