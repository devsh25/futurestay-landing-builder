import { DesignTokens } from './types';

export const DEFAULT_TOKENS: DesignTokens = {
  primaryGradientStart: '#3963E7',
  primaryGradientEnd: '#543CE8',
  accentColor: '#F05C61',
  buttonBorderRadius: '32px',
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  headingFontWeight: '800',
  bodyFontSize: '16px',
};

export function gradient(tokens: DesignTokens): string {
  return `linear-gradient(90.37deg, ${tokens.primaryGradientStart} 8.45%, ${tokens.primaryGradientEnd} 98.1%)`;
}
