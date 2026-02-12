import { DesignTokens } from '../../lib/types';
import { gradient } from '../../lib/designTokens';

export function generateComparisonCss(tokens: DesignTokens): string {
  return `
/* Comparison table */
#pdf-comparison-table {
  max-width: 900px !important;
  margin: 0 auto !important;
  padding: 60px 20px !important;
}

.pdf-comp-title {
  text-align: center !important;
  font-size: 36px !important;
  font-weight: ${tokens.headingFontWeight} !important;
  margin-bottom: 40px !important;
  color: #1a1a2e !important;
}

.pdf-comp-table {
  width: 100% !important;
  border-collapse: separate !important;
  border-spacing: 0 !important;
  border-radius: 12px !important;
  overflow: hidden !important;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08) !important;
}

.pdf-comp-table th {
  padding: 16px 20px !important;
  text-align: left !important;
  font-weight: 700 !important;
}

.pdf-comp-table th:first-child {
  background: #fff !important;
  color: #333 !important;
}

.pdf-comp-table th:nth-child(2) {
  background: ${gradient(tokens)} !important;
  color: #fff !important;
}

.pdf-comp-table th:nth-child(n+3) {
  background: #f8f8f8 !important;
  color: #333 !important;
}

.pdf-comp-table td {
  padding: 14px 20px !important;
  border-bottom: 1px solid #eee !important;
}

.pdf-comp-table td:nth-child(2) {
  font-weight: 600 !important;
  color: ${tokens.primaryGradientStart} !important;
}

.pdf-comp-table .check-mark {
  color: #04D361 !important;
}
`;
}
