import { DesignTokens } from '../../lib/types';

export function generateFaqCss(tokens: DesignTokens): string {
  return `
/* FAQ section */
#faq-section {
  max-width: 800px !important;
  margin: 0 auto !important;
  padding: 60px 20px !important;
}

.faq-title {
  text-align: center !important;
  font-size: 36px !important;
  font-weight: 800 !important;
  margin-bottom: 40px !important;
  color: #1a1a2e !important;
}

.faq-item {
  border-bottom: 1px solid #eee !important;
  padding: 20px 0 !important;
}

.faq-question {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  cursor: pointer !important;
  font-size: 18px !important;
  font-weight: 600 !important;
  color: #1a1a2e !important;
  background: none !important;
  border: none !important;
  width: 100% !important;
  text-align: left !important;
  padding: 0 !important;
}

.faq-question:hover {
  color: ${tokens.primaryGradientStart} !important;
}

.faq-arrow {
  font-size: 20px !important;
  transition: transform 0.3s !important;
  color: #999 !important;
}

.faq-item.open .faq-arrow {
  transform: rotate(180deg) !important;
}

.faq-answer {
  max-height: 0 !important;
  overflow: hidden !important;
  transition: max-height 0.3s !important;
  padding: 0 !important;
}

.faq-item.open .faq-answer {
  max-height: 500px !important;
  padding-top: 12px !important;
}

.faq-answer p {
  font-size: 16px !important;
  line-height: 1.6 !important;
  color: #555 !important;
}
`;
}
