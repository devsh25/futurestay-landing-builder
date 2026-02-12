import { DesignTokens } from '../../lib/types';
import { gradient } from '../../lib/designTokens';

export function generateHeroCss(tokens: DesignTokens): string {
  return `
/* Hero section */
.two_col_gray_banner {
  padding-top: 40px !important;
}

.cta-container {
  display: flex !important;
  gap: 16px !important;
  flex-wrap: wrap !important;
}

.cta-container a,
.cta-container button {
  padding: 16px 32px !important;
  border-radius: ${tokens.buttonBorderRadius} !important;
  font-weight: 700 !important;
  font-size: 16px !important;
  text-decoration: none !important;
  display: inline-block !important;
}

.cta-container .cta-primary {
  background: ${gradient(tokens)} !important;
  color: #fff !important;
  border: none !important;
}

.cta-container .cta-secondary {
  border: 2px solid ${tokens.accentColor} !important;
  color: ${tokens.accentColor} !important;
  background: transparent !important;
}
`;
}
