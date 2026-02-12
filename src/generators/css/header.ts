import { HeaderSection, DesignTokens } from '../../lib/types';
import { gradient } from '../../lib/designTokens';

export function generateHeaderCss(header: HeaderSection, tokens: DesignTokens): string {
  return `
/* Sticky header */
#custom-sticky-header {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  z-index: 99999 !important;
  background: #fff !important;
  box-shadow: 0 2px 16px rgba(0,0,0,0.08) !important;
  padding: 12px 32px !important;
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  box-sizing: border-box !important;
}

.csh-logo {
  display: flex !important;
  align-items: center !important;
  gap: 12px !important;
  text-decoration: none !important;
  color: #222 !important;
}

.csh-logo img {
  height: 38px !important;
  width: auto !important;
}

.csh-btns {
  display: flex !important;
  gap: 12px !important;
}

.csh-btn-solid {
  background: ${gradient(tokens)} !important;
  color: #fff !important;
  border: none !important;
  padding: 14px 32px !important;
  border-radius: ${tokens.buttonBorderRadius} !important;
  font-weight: 600 !important;
  font-size: 14px !important;
  cursor: pointer !important;
  text-decoration: none !important;
  display: inline-block !important;
}

.csh-btn-outline {
  background: transparent !important;
  border: 2px solid ${tokens.accentColor} !important;
  color: ${tokens.accentColor} !important;
  padding: 14px 32px !important;
  border-radius: ${tokens.buttonBorderRadius} !important;
  font-weight: 600 !important;
  font-size: 14px !important;
  cursor: pointer !important;
  text-decoration: none !important;
  display: inline-block !important;
}
`;
}
