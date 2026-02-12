import { DesignTokens } from '../../lib/types';

export function generateBaseCss(tokens: DesignTokens): string {
  return `
/* Base styles */
body {
  font-family: ${tokens.fontFamily} !important;
  font-size: ${tokens.bodyFontSize} !important;
  overflow-x: hidden !important;
  padding-top: 80px !important;
}

.header-new {
  display: none !important;
}
`;
}
