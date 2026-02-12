import { PageData } from '../lib/types';
import { generateHeaderHtml } from './html/header';
import { generateFeaturesHtml } from './html/features';
import { generateComparisonHtml } from './html/comparison';
import { generateFaqHtml } from './html/faq';
import { generateRepositionScript } from './html/repositionScript';

export function generateFooterHtml(data: PageData): string {
  const tokens = data.designTokens;
  const parts: string[] = [];

  // Sticky header HTML (always included)
  parts.push(generateHeaderHtml(data.header, tokens));

  // Conditionally include sections based on enabled flags
  if (data.features.enabled) {
    parts.push(generateFeaturesHtml(data.features, tokens));
  }

  if (data.comparison.enabled) {
    parts.push(generateComparisonHtml(data.comparison, tokens));
  }

  if (data.faq.enabled) {
    parts.push(generateFaqHtml(data.faq));
  }

  // Reposition script (always included)
  parts.push(`<script>\n${generateRepositionScript(data)}\n</script>`);

  return parts.join('\n\n');
}
