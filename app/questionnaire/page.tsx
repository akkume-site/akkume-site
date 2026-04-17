import QuestionnaireRouter from '@/components/QuestionnaireRouter';
import { questionnaireCopy } from '@/lib/site-content';

export default function QuestionnairePage() {
  return (
    <main className="mx-auto max-w-4xl space-y-8 px-4 py-8 sm:px-6">
      <section className="space-y-3">
        <div className="text-sm font-medium uppercase tracking-[0.18em] text-amber-600">Questionnaire</div>
        <h1 className="text-4xl font-semibold tracking-tight">{questionnaireCopy.title}</h1>
        <p className="text-neutral-700">{questionnaireCopy.subtitle}</p>
        <p className="text-neutral-600">{questionnaireCopy.subtitle2}</p>
      </section>

      <QuestionnaireRouter />
    </main>
  );
}
