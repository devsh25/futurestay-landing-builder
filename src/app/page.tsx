'use client';

import { usePageStore } from '@/store/pageStore';
import { usePreview } from '@/hooks/usePreview';
import { useAutoSave } from '@/hooks/useAutoSave';
import { useDeploy } from '@/hooks/useDeploy';
import BuilderLayout from '@/components/builder/BuilderLayout';
import DeployDialog from '@/components/builder/DeployDialog';

import HeaderForm from '@/components/sections/HeaderForm';
import HeroForm from '@/components/sections/HeroForm';
import SocialProofBarForm from '@/components/sections/SocialProofBarForm';
import PartnerLogosForm from '@/components/sections/PartnerLogosForm';
import StepsForm from '@/components/sections/StepsForm';
import StatsForm from '@/components/sections/StatsForm';
import FeaturesForm from '@/components/sections/FeaturesForm';
import TestimonialsForm from '@/components/sections/TestimonialsForm';
import ComparisonForm from '@/components/sections/ComparisonForm';
import CtaSectionForm from '@/components/sections/CtaSectionForm';
import FaqForm from '@/components/sections/FaqForm';
import FooterForm from '@/components/sections/FooterForm';

const SECTION_FORMS: Record<string, React.ComponentType> = {
  header: HeaderForm,
  hero: HeroForm,
  socialProofBar: SocialProofBarForm,
  partnerLogos: PartnerLogosForm,
  steps: StepsForm,
  stats: StatsForm,
  features: FeaturesForm,
  testimonials: TestimonialsForm,
  comparison: ComparisonForm,
  ctaSection: CtaSectionForm,
  faq: FaqForm,
  footer: FooterForm,
};

export default function Home() {
  useAutoSave();
  const previewHtml = usePreview();
  const { getGeneratedCode } = useDeploy();

  const activeSection = usePageStore((s) => s.activeSection);
  const showDeployDialog = usePageStore((s) => s.showDeployDialog);
  const setShowDeployDialog = usePageStore((s) => s.setShowDeployDialog);

  const ActiveForm = SECTION_FORMS[activeSection];
  const { headHtml, footerHtml } = showDeployDialog ? getGeneratedCode() : { headHtml: '', footerHtml: '' };

  return (
    <>
      <BuilderLayout previewHtml={previewHtml}>
        {ActiveForm ? <ActiveForm /> : <p className="text-sm text-slate-500">Select a section to edit</p>}
      </BuilderLayout>

      <DeployDialog
        open={showDeployDialog}
        onClose={() => setShowDeployDialog(false)}
        headHtml={headHtml}
        footerHtml={footerHtml}
      />
    </>
  );
}
