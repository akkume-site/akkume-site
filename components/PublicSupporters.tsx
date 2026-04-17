'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type Supporter = {
  id: string;
  full_name: string | null;
  company: string | null;
  role_selected: string | null;
};

export default function PublicSupporters() {
  const [supporters, setSupporters] = useState<Supporter[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('public_supporter_list').select('*').limit(50);
      setSupporters(data || []);
    };
    load();
  }, []);

  return (
    <section className="rounded-3xl border border-neutral-200 bg-white p-6">
      <h2 className="text-2xl font-semibold">Public supporters</h2>
      <div className="mt-4 grid gap-3">
        {supporters.length === 0 ? (
          <p className="text-sm text-neutral-500">No public supporters yet.</p>
        ) : (
          supporters.map((item) => (
            <div key={item.id} className="rounded-xl border border-neutral-200 p-4">
              <div className="font-medium">{item.full_name || 'Supporter'}</div>
              <div className="text-sm text-neutral-600">
                {[item.company, item.role_selected].filter(Boolean).join(' • ')}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
