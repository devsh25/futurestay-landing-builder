import { create } from 'zustand';
import { PageData, PreviewDevice, SectionKey, OrderableSectionKey } from '../lib/types';
import { DEFAULT_PAGE_DATA } from '../lib/defaults';

interface PageBuilderStore extends PageData {
  activeSection: string;
  previewDevice: PreviewDevice;
  isDirty: boolean;
  isDeploying: boolean;
  showDeployDialog: boolean;

  updateSection: <K extends SectionKey>(section: K, data: Partial<PageData[K]>) => void;
  updatePageMeta: (data: Partial<Pick<PageData, 'pageName' | 'pageSlug' | 'hubspotPageId'>>) => void;
  setActiveSection: (section: string) => void;
  setPreviewDevice: (device: PreviewDevice) => void;
  setIsDeploying: (v: boolean) => void;
  setShowDeployDialog: (v: boolean) => void;
  setSectionOrder: (order: OrderableSectionKey[]) => void;
  loadFromJson: (data: PageData) => void;
  getPageData: () => PageData;
  reset: () => void;
}

export const usePageStore = create<PageBuilderStore>((set, get) => ({
  ...DEFAULT_PAGE_DATA,
  activeSection: 'hero',
  previewDevice: 'desktop',
  isDirty: false,
  isDeploying: false,
  showDeployDialog: false,

  updateSection: (section, data) =>
    set((state) => ({
      [section]: { ...state[section], ...data },
      isDirty: true,
    })),

  updatePageMeta: (data) => set({ ...data, isDirty: true }),

  setActiveSection: (section) => set({ activeSection: section }),
  setPreviewDevice: (device) => set({ previewDevice: device }),
  setIsDeploying: (v) => set({ isDeploying: v }),
  setShowDeployDialog: (v) => set({ showDeployDialog: v }),
  setSectionOrder: (order) => set({ sectionOrder: order, isDirty: true }),

  loadFromJson: (data) =>
    set({
      ...data,
      isDirty: false,
    }),

  getPageData: () => {
    const state = get();
    return {
      pageName: state.pageName,
      pageSlug: state.pageSlug,
      hubspotPageId: state.hubspotPageId,
      designTokens: state.designTokens,
      header: state.header,
      hero: state.hero,
      socialProofBar: state.socialProofBar,
      partnerLogos: state.partnerLogos,
      steps: state.steps,
      stats: state.stats,
      features: state.features,
      testimonials: state.testimonials,
      comparison: state.comparison,
      ctaSection: state.ctaSection,
      faq: state.faq,
      footer: state.footer,
      sectionOrder: state.sectionOrder,
    };
  },

  reset: () => set({ ...DEFAULT_PAGE_DATA, isDirty: false }),
}));
