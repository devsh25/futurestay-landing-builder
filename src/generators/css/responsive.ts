import { DesignTokens } from '../../lib/types';

export function generateResponsiveCss(tokens: DesignTokens): string {
  return `
/* Responsive styles */
@media (max-width: 768px) {
  body {
    padding-top: 60px !important;
    overflow-x: hidden !important;
  }

  #custom-sticky-header {
    padding: 8px 16px !important;
  }

  .csh-btn-outline {
    display: none !important;
  }

  .csh-btn-solid {
    padding: 10px 20px !important;
    font-size: 13px !important;
  }

  .two_col_gray_banner {
    padding: 20px !important;
  }

  .cta-container {
    flex-direction: column !important;
    width: 100% !important;
  }

  .cta-container a,
  .cta-container button {
    width: 100% !important;
    text-align: center !important;
  }

  #pdf-features-section .pdf-feature-row {
    flex-direction: column !important;
  }

  #pdf-features-section .pdf-feature-row:nth-child(even) {
    flex-direction: column !important;
  }

  .pdf-feature-img {
    max-width: 100% !important;
  }

  .pdf-comp-table {
    font-size: 12px !important;
  }

  .pdf-comp-table th,
  .pdf-comp-table td {
    padding: 8px 10px !important;
  }

  #faq-section .faq-question {
    font-size: 15px !important;
  }

  #faq-section .faq-answer p {
    font-size: 14px !important;
  }

  img {
    max-width: 100% !important;
    height: auto !important;
  }
}
`;
}
