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
}

export interface Stat {
  value: string;
  label: string;
}

export interface StatsSection {
  enabled: boolean;
  stats: Stat[];
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
}

export interface CtaSection {
  enabled: boolean;
  headline: string;
  subtext: string;
  ctaText: string;
  ctaUrl: string;
  imageUrl: string;
  testimonial: Testimonial | null;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqSection {
  enabled: boolean;
  sectionTitle: string;
  items: FaqItem[];
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
}

export type SectionKey = keyof Omit<PageData, 'pageName' | 'pageSlug' | 'hubspotPageId'>;

export type PreviewDevice = 'desktop' | 'tablet' | 'mobile';
