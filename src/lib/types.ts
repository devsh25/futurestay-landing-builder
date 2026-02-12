// Size preset types
export type TextSize = 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
export type ImageSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface DesignTokens {
  primaryGradientStart: string;
  primaryGradientEnd: string;
  accentColor: string;
  buttonBorderRadius: string;
  fontFamily: string;
  headingFontWeight: string;
  bodyFontSize: string;
}

export interface HeaderSection {
  logoUrl: string;
  primaryCtaText: string;
  primaryCtaUrl: string;
  secondaryCtaText: string;
  secondaryCtaUrl: string;
  sticky: boolean;
}

export interface TrustBadge {
  icon: string;
  text: string;
}

export interface HeroSection {
  headline: string;
  subtext: string;
  primaryCtaText: string;
  primaryCtaUrl: string;
  secondaryCtaText: string;
  secondaryCtaUrl: string;
  trustBadges: TrustBadge[];
  heroImageUrl: string;
  headlineSize?: TextSize;
  subtextSize?: TextSize;
  heroImageSize?: ImageSize;
}

export interface SocialProofBadge {
  imageUrl: string;
  text: string;
}

export interface SocialProofBarSection {
  enabled: boolean;
  badges: SocialProofBadge[];
}

export interface PartnerLogo {
  name: string;
  imageUrl: string;
}

export interface PartnerLogosSection {
  enabled: boolean;
  logos: PartnerLogo[];
}

export interface Step {
  stepNumber: string;
  title: string;
  description: string;
  iconUrl: string;
}

export interface StepsSection {
  enabled: boolean;
  sectionTitle: string;
  steps: Step[];
  sectionTitleSize?: TextSize;
  cardTitleSize?: TextSize;
  stepIconSize?: ImageSize;
}

export interface Stat {
  value: string;
  label: string;
}

export interface StatsSection {
  enabled: boolean;
  stats: Stat[];
  valueSize?: TextSize;
  labelSize?: TextSize;
}

export interface Feature {
  title: string;
  description: string;
  imageUrl: string;
}

export interface FeaturesSection {
  enabled: boolean;
  sectionTitle: string;
  features: Feature[];
  sectionTitleSize?: TextSize;
  cardTitleSize?: TextSize;
  featureImageSize?: ImageSize;
}

export interface Testimonial {
  quote: string;
  authorName: string;
  authorTitle: string;
  rating: number;
}

export interface TestimonialsSection {
  enabled: boolean;
  sectionTitle: string;
  testimonials: Testimonial[];
  sectionTitleSize?: TextSize;
  quoteSize?: TextSize;
}

export interface ComparisonRow {
  feature: string;
  values: string[];
}

export interface ComparisonSection {
  enabled: boolean;
  sectionTitle: string;
  columns: string[];
  rows: ComparisonRow[];
  sectionTitleSize?: TextSize;
}

export interface CtaSection {
  enabled: boolean;
  headline: string;
  subtext: string;
  ctaText: string;
  ctaUrl: string;
  imageUrl: string;
  testimonial: Testimonial | null;
  headlineSize?: TextSize;
  subtextSize?: TextSize;
  ctaImageSize?: ImageSize;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqSection {
  enabled: boolean;
  sectionTitle: string;
  items: FaqItem[];
  sectionTitleSize?: TextSize;
  questionSize?: TextSize;
}

export interface FooterSection {
  phone: string;
  email: string;
  copyrightText: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
    linkedin: string;
  };
}

export interface PageData {
  pageName: string;
  pageSlug: string;
  hubspotPageId: string | null;
  designTokens: DesignTokens;
  header: HeaderSection;
  hero: HeroSection;
  socialProofBar: SocialProofBarSection;
  partnerLogos: PartnerLogosSection;
  steps: StepsSection;
  stats: StatsSection;
  features: FeaturesSection;
  testimonials: TestimonialsSection;
  comparison: ComparisonSection;
  ctaSection: CtaSection;
  faq: FaqSection;
  footer: FooterSection;
  sectionOrder: OrderableSectionKey[];
}

export type SectionKey = keyof Omit<PageData, 'pageName' | 'pageSlug' | 'hubspotPageId' | 'sectionOrder'>;

export type OrderableSectionKey = Exclude<SectionKey, 'designTokens'>;

export type PreviewDevice = 'desktop' | 'tablet' | 'mobile';
