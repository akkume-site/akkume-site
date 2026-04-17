'use client';

import { useSearchParams } from 'next/navigation';
import Tier1Questionnaire from '@/components/Tier1Questionnaire';
import Tier2Questionnaire from '@/components/Tier2Questionnaire';

export default function QuestionnaireRouter() {
  const searchParams = useSearchParams();
  const tier = searchParams.get('tier');
  const tier1 = searchParams.get('tier1');

  if (tier === '2') {
    return <Tier2Questionnaire tier1Id={tier1} />;
  }

  return <Tier1Questionnaire />;
}
