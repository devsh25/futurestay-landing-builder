import { HeaderSection, DesignTokens } from '../../lib/types';

export function generateHeaderHtml(header: HeaderSection, tokens: DesignTokens): string {
  const svgPlaceholder = `<svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="38" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="${tokens.primaryGradientStart}"/>
          <stop offset="100%" stop-color="${tokens.primaryGradientEnd}"/>
        </linearGradient>
      </defs>
      <rect width="38" height="38" rx="8" fill="url(#logo-grad)"/>
      <rect x="8" y="10" width="22" height="3" rx="1.5" fill="#fff"/>
      <rect x="8" y="17" width="22" height="3" rx="1.5" fill="#fff"/>
      <rect x="8" y="24" width="22" height="3" rx="1.5" fill="#fff"/>
    </svg>`;

  return `<div id="custom-sticky-header">
  <a href="/" class="csh-logo">
    <span class="csh-logo-svg">${svgPlaceholder}</span>
    <span class="csh-logo-text" style="font-weight:700;font-size:18px;">FutureStay</span>
  </a>
  <div class="csh-btns">
    <a href="${escapeAttr(header.secondaryCtaUrl)}" class="csh-btn-outline">${escapeHtml(header.secondaryCtaText)}</a>
    <a href="${escapeAttr(header.primaryCtaUrl)}" class="csh-btn-solid">${escapeHtml(header.primaryCtaText)}</a>
  </div>
</div>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeAttr(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
