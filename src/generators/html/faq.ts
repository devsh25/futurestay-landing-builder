import { FaqSection } from '../../lib/types';

export function generateFaqHtml(faq: FaqSection): string {
  const faqItems = faq.items.map((item) => {
    return `    <div class="faq-item">
      <button class="faq-question">
        <span>${escapeHtml(item.question)}</span>
        <span class="faq-arrow">\u25BC</span>
      </button>
      <div class="faq-answer">
        <p>${escapeHtml(item.answer)}</p>
      </div>
    </div>`;
  }).join('\n');

  return `<div id="faq-section">
  <h2 class="faq-title">${escapeHtml(faq.sectionTitle)}</h2>
${faqItems}
</div>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
