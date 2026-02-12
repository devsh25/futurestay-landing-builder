import { FeaturesSection, DesignTokens } from '../../lib/types';

export function generateFeaturesHtml(features: FeaturesSection, tokens: DesignTokens): string {
  const featureRows = features.features.map((feature) => {
    const imageBlock = feature.imageUrl
      ? `<img src="${escapeAttr(feature.imageUrl)}" alt="${escapeAttr(feature.title)}" />`
      : `<div style="width:100%;height:200px;background:#f0f0f5;border-radius:12px;display:flex;align-items:center;justify-content:center;color:#999;font-size:14px;">Image placeholder</div>`;

    return `    <div class="pdf-feature-row">
      <div class="pdf-feature-img">
        ${imageBlock}
      </div>
      <div class="pdf-feature-text">
        <h3>${escapeHtml(feature.title)}</h3>
        <p>${escapeHtml(feature.description)}</p>
      </div>
    </div>`;
  }).join('\n');

  return `<div id="pdf-features-section">
  <h2 class="pdf-features-title">${escapeHtml(features.sectionTitle)}</h2>
${featureRows}
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
