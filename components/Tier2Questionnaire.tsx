'use client';

import { useState } from 'react';
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
  'Individual (Retail / Borrower)',
];

const participantTypes = ['Decision-maker', 'Influencer', 'Research / Observer'];
const biggestBarriers = [
  'High monthly payments',
  'Lack of savings / reserves',
  'Down payment constraints',
  'Credit qualification rigidity',
  'Volatile income',
  'High default risk in early loan life',
  'Systemic risk to lenders / taxpayers',
];
const implementationBarriers = [
  'Regulatory uncertainty',
  'Accounting treatment',
  'Custody / infrastructure',
  'Volatility concerns',
  'Consumer understanding',
  'None',
];

export default function Tier2Questionnaire({ tier1Id }: { tier1Id?: string | null }) {
  const [form, setForm] = useState({
    respondent_name: '',
    email: '',
    company: '',
    title: '',
    industry: '',
    participant_type: '',
    biggest_barriers: [] as string[],
    default_risk_timing: '',
    protects_borrowers: '',
    protects_lenders: '',
    protects_taxpayers: '',
    estimated_loss_severity: '',
    concept_rating: '',
    compared_to_mi_crt: '',
    optimal_reserve_size: '',
    reserve_structure: '',
    reserve_qualification: '',
    increase_approval_rates: '',
    reduce_defaults: '',
    improve_borrower_outcomes: '',
    support_first_time_homebuyers: false,
    support_low_balance_loans: false,
    support_manufactured_housing: false,
    support_fha_va_usda: false,
    reduce_dpa_reliance: '',
    reduce_government_guarantees: '',
    implementation_barriers: [] as string[],
    can_custody_digital_assets: '',
    can_integrate_system: '',
    can_pilot_program: '',
    timeline_to_support_pilot: '',
    invest_in_btc_enhanced_mbs: '',
    expected_credit_quality_impact: '',
    expected_yield_impact: '',
    attract_new_capital: '',
    support_fhfa_pilot_tier2: '',
    level_of_support: '',
    public_listing_preference: '',
    concerns_to_address: '',
    must_adopt_conditions: '',
    additional_comments: '',
  });
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const toggleList = (field: 'biggest_barriers' | 'implementation_barriers', item: string, max?: number) => {
    const current = form[field];
    if (current.includes(item)) {
      setForm({ ...form, [field]: current.filter((x) => x !== item) });
      return;
    }
    if (!max || current.length < max) {
      setForm({ ...form, [field]: [...current, item] });
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const { error } = await supabase.from('survey_responses_tier2').insert([
      {
        ...form,
        tier1_response_id: tier1Id || null,
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
        <h2 className="text-2xl font-semibold">Detailed response submitted</h2>
        <p className="mt-2 text-neutral-600">Thank you for helping shape the pilot.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5 rounded-3xl border border-neutral-200 bg-white p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <input className="min-h-11 rounded-xl border px-4 py-3" placeholder="Name" value={form.respondent_name} onChange={(e) => setForm({ ...form, respondent_name: e.target.value })} />
        <input className="min-h-11 rounded-xl border px-4 py-3" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="min-h-11 rounded-xl border px-4 py-3" placeholder="Company / Organization" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
        <input className="min-h-11 rounded-xl border px-4 py-3" placeholder="Role / Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
      </div>

      <select className="min-h-11 w-full rounded-xl border px-4 py-3" value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })}>
        <option value="">Industry</option>
        {industries.map((item) => <option key={item}>{item}</option>)}
      </select>

      <div className="grid gap-2">
        {participantTypes.map((item) => (
          <label key={item} className="flex items-center gap-2 rounded-xl border p-3 text-sm">
            <input type="radio" name="ptype" checked={form.participant_type === item} onChange={() => setForm({ ...form, participant_type: item })} />
            <span>{item}</span>
          </label>
        ))}
      </div>

      <div className="grid gap-2">
        {biggestBarriers.map((item) => (
          <label key={item} className="flex items-center gap-2 rounded-xl border p-3 text-sm">
            <input type="checkbox" checked={form.biggest_barriers.includes(item)} onChange={() => toggleList('biggest_barriers', item, 3)} />
            <span>{item}</span>
          </label>
        ))}
      </div>

      <input className="min-h-11 w-full rounded-xl border px-4 py-3" placeholder="At what point is mortgage default risk highest?" value={form.default_risk_timing} onChange={(e) => setForm({ ...form, default_risk_timing: e.target.value })} />
      <input className="min-h-11 w-full rounded-xl border px-4 py-3" placeholder="Do current mortgage structures adequately protect borrowers? (Yes / No)" value={form.protects_borrowers} onChange={(e) => setForm({ ...form, protects_borrowers: e.target.value })} />
      <input className="min-h-11 w-full rounded-xl border px-4 py-3" placeholder="Do current mortgage structures adequately protect lenders? (Yes / No)" value={form.protects_lenders} onChange={(e) => setForm({ ...form, protects_lenders: e.target.value })} />
      <input className="min-h-11 w-full rounded-xl border px-4 py-3" placeholder="Do current mortgage structures adequately protect taxpayers? (Yes / No)" value={form.protects_taxpayers} onChange={(e) => setForm({ ...form, protects_taxpayers: e.target.value })} />
      <input className="min-h-11 w-full rounded-xl border px-4 py-3" placeholder="Estimated loss severity per default" value={form.estimated_loss_severity} onChange={(e) => setForm({ ...form, estimated_loss_severity: e.target.value })} />

      <input className="min-h-11 w-full rounded-xl border px-4 py-3" placeholder="Does adding a borrower-owned reserve asset improve mortgage resilience?" value={form.concept_rating} onChange={(e) => setForm({ ...form, concept_rating: e.target.value })} />
      <input className="min-h-11 w-full rounded-xl border px-4 py-3" placeholder="Compared to traditional tools (MI / CRT), how would you rate this concept?" value={form.compared_to_mi_crt} onChange={(e) => setForm({ ...form, compared_to_mi_crt: e.target.value })} />
      <input className="min-h-11 w-full rounded-xl border px-4 py-3" placeholder="What % reserve would be most viable?" value={form.optimal_reserve_size} onChange={(e) => setForm({ ...form, optimal_reserve_size: e.target.value })} />
      <input className="min-h-11 w-full rounded-xl border px-4 py-3" placeholder="Should this reserve be locked, partially accessible, or fully borrower-controlled?" value={form.reserve_structure} onChange={(e) => setForm({ ...form, reserve_structure: e.target.value })} />
      <input className="min-h-11 w-full rounded-xl border px-4 py-3" placeholder="Should the reserve qualify as closing cost, credit enhancement, savings requirement, or not sure?" value={form.reserve_qualification} onChange={(e) => setForm({ ...form, reserve_qualification: e.target.value })} />

      <div className="grid gap-4 sm:grid-cols-2">
        <input className="min-h-11 rounded-xl border px-4 py-3" placeholder="Increase approval rates? (Yes / No)" value={form.increase_approval_rates} onChange={(e) => setForm({ ...form, increase_approval_rates: e.target.value })} />
        <input className="min-h-11 rounded-xl border px-4 py-3" placeholder="Reduce defaults? (Yes / No)" value={form.reduce_defaults} onChange={(e) => setForm({ ...form, reduce_defaults: e.target.value })} />
        <input className="min-h-11 rounded-xl border px-4 py-3 sm:col-span-2" placeholder="Improve borrower financial outcomes? (Yes / No)" value={form.improve_borrower_outcomes} onChange={(e) => setForm({ ...form, improve_borrower_outcomes: e.target.value })} />
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <label className="flex items-center gap-2 rounded-xl border p-3 text-sm"><input type="checkbox" checked={form.support_first_time_homebuyers} onChange={(e) => setForm({ ...form, support_first_time_homebuyers: e.target.checked })} />First-time homebuyers</label>
        <label className="flex items-center gap-2 rounded-xl border p-3 text-sm"><input type="checkbox" checked={form.support_low_balance_loans} onChange={(e) => setForm({ ...form, support_low_balance_loans: e.target.checked })} />Low-balance mortgages</label>
        <label className="flex items-center gap-2 rounded-xl border p-3 text-sm"><input type="checkbox" checked={form.support_manufactured_housing} onChange={(e) => setForm({ ...form, support_manufactured_housing: e.target.checked })} />Manufactured housing</label>
        <label className="flex items-center gap-2 rounded-xl border p-3 text-sm"><input type="checkbox" checked={form.support_fha_va_usda} onChange={(e) => setForm({ ...form, support_fha_va_usda: e.target.checked })} />FHA / VA / USDA loans</label>
      </div>

      <input className="min-h-11 w-full rounded-xl border px-4 py-3" placeholder="Would this reduce reliance on down payment assistance programs? (Yes / No)" value={form.reduce_dpa_reliance} onChange={(e) => setForm({ ...form, reduce_dpa_reliance: e.target.value })} />
      <input className="min-h-11 w-full rounded-xl border px-4 py-3" placeholder="Would this reduce reliance on government guarantees? (Yes / No)" value={form.reduce_government_guarantees} onChange={(e) => setForm({ ...form, reduce_government_guarantees: e.target.value })} />

      <div className="grid gap-2">
        {implementationBarriers.map((item) => (
          <label key={item} className="flex items-center gap-2 rounded-xl border p-3 text-sm">
            <input type="checkbox" checked={form.implementation_barriers.includes(item)} onChange={() => toggleList('implementation_barriers', item)} />
            <span>{item}</span>
          </label>
        ))}
      </div>

      <input className="min-h-11 w-full rounded-xl border px-4 py-3" placeholder="Does your organization have the capability to custody digital assets? (Yes / No)" value={form.can_custody_digital_assets} onChange={(e) => setForm({ ...form, can_custody_digital_assets: e.target.value })} />
      <input className="min-h-11 w-full rounded-xl border px-4 py-3" placeholder="Integrate with such a system? (Yes / No)" value={form.can_integrate_system} onChange={(e) => setForm({ ...form, can_integrate_system: e.target.value })} />
      <input className="min-h-11 w-full rounded-xl border px-4 py-3" placeholder="Pilot a program? (Yes / No)" value={form.can_pilot_program} onChange={(e) => setForm({ ...form, can_pilot_program: e.target.value })} />
      <input className="min-h-11 w-full rounded-xl border px-4 py-3" placeholder="Timeline to support a pilot (<6 months / 6–12 months / 12+ months)" value={form.timeline_to_support_pilot} onChange={(e) => setForm({ ...form, timeline_to_support_pilot: e.target.value })} />

      <input className="min-h-11 w-full rounded-xl border px-4 py-3" placeholder="Would you invest in mortgage-backed securities enhanced with a Bitcoin reserve layer? (Yes / No / Maybe)" value={form.invest_in_btc_enhanced_mbs} onChange={(e) => setForm({ ...form, invest_in_btc_enhanced_mbs: e.target.value })} />
      <input className="min-h-11 w-full rounded-xl border px-4 py-3" placeholder="Expected impact on credit quality" value={form.expected_credit_quality_impact} onChange={(e) => setForm({ ...form, expected_credit_quality_impact: e.target.value })} />
      <input className="min-h-11 w-full rounded-xl border px-4 py-3" placeholder="Expected impact on yield attractiveness" value={form.expected_yield_impact} onChange={(e) => setForm({ ...form, expected_yield_impact: e.target.value })} />
      <input className="min-h-11 w-full rounded-xl border px-4 py-3" placeholder="Would this attract new capital to housing finance? (Yes / No)" value={form.attract_new_capital} onChange={(e) => setForm({ ...form, attract_new_capital: e.target.value })} />

      <input className="min-h-11 w-full rounded-xl border px-4 py-3" placeholder="Do you support a pilot program with FHFA? (Yes / No / Need more info)" value={form.support_fhfa_pilot_tier2} onChange={(e) => setForm({ ...form, support_fhfa_pilot_tier2: e.target.value })} />
      <input className="min-h-11 w-full rounded-xl border px-4 py-3" placeholder="Level of support" value={form.level_of_support} onChange={(e) => setForm({ ...form, level_of_support: e.target.value })} />
      <input className="min-h-11 w-full rounded-xl border px-4 py-3" placeholder="Would you like to be listed as a supporter? (Yes public / Yes private / No)" value={form.public_listing_preference} onChange={(e) => setForm({ ...form, public_listing_preference: e.target.value })} />

      <textarea className="min-h-[110px] w-full rounded-xl border px-4 py-3" placeholder="What concerns would you want addressed before adoption?" value={form.concerns_to_address} onChange={(e) => setForm({ ...form, concerns_to_address: e.target.value })} />
      <textarea className="min-h-[110px] w-full rounded-xl border px-4 py-3" placeholder="What would make this a must adopt for your organization?" value={form.must_adopt_conditions} onChange={(e) => setForm({ ...form, must_adopt_conditions: e.target.value })} />
      <textarea className="min-h-[110px] w-full rounded-xl border px-4 py-3" placeholder="Additional comments" value={form.additional_comments} onChange={(e) => setForm({ ...form, additional_comments: e.target.value })} />

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <button className="inline-flex min-h-11 items-center justify-center rounded-full bg-neutral-900 px-5 py-3 text-sm font-medium text-white">
        Submit detailed response
      </button>
    </form>
  );
}
