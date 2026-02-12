import { PageData } from '../lib/types';
import { generateBaseCss } from './css/base';
import { generateHeaderCss } from './css/header';
import { generateHeroCss } from './css/hero';
import { generateFeaturesCss } from './css/features';
import { generateComparisonCss } from './css/comparison';
import { generateFaqCss } from './css/faq';
import { generateResponsiveCss } from './css/responsive';

export function generateHeadHtml(data: PageData): string {
  const tokens = data.designTokens;

  const cssBlocks: string[] = [
    generateBaseCss(tokens),
    generateHeaderCss(data.header, tokens),
    generateHeroCss(tokens),
  ];

  if (data.features.enabled) {
    cssBlocks.push(generateFeaturesCss(tokens));
  }

  if (data.comparison.enabled) {
    cssBlocks.push(generateComparisonCss(tokens));
  }

  if (data.faq.enabled) {
    cssBlocks.push(generateFaqCss(tokens));
  }

  cssBlocks.push(generateResponsiveCss(tokens));

  return `<style>\n${cssBlocks.join('\n')}\n</style>`;
}
