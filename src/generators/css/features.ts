import { DesignTokens } from '../../lib/types';

export function generateFeaturesCss(tokens: DesignTokens): string {
  return `
/* Features section */
#pdf-features-section {
  max-width: 1100px !important;
  margin: 0 auto !important;
  padding: 60px 20px !important;
}

.pdf-features-title {
  text-align: center !important;
  font-size: 36px !important;
  font-weight: ${tokens.headingFontWeight} !important;
  margin-bottom: 50px !important;
  color: #1a1a2e !important;
}

.pdf-feature-row {
  display: flex !important;
  gap: 40px !important;
  align-items: center !important;
  margin-bottom: 50px !important;
}

.pdf-feature-row:nth-child(even) {
  flex-direction: row-reverse !important;
}

.pdf-feature-img {
  flex: 0 0 45% !important;
}

.pdf-feature-img img {
  max-width: 100% !important;
  border-radius: 12px !important;
}

.pdf-feature-text {
  flex: 1 !important;
}

.pdf-feature-text h3 {
  font-size: 24px !important;
  font-weight: 700 !important;
  margin-bottom: 12px !important;
  color: #1a1a2e !important;
}

.pdf-feature-text p {
  font-size: 16px !important;
  line-height: 1.6 !important;
  color: #555 !important;
}
`;
}
