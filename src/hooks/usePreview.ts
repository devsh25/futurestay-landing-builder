'use client';

import { useEffect, useState, useRef } from 'react';
import { usePageStore } from '@/store/pageStore';
import { generateHeadHtml } from '@/generators/generateHeadHtml';
import { generateFooterHtml } from '@/generators/generateFooterHtml';
import { PageData } from '@/lib/types';

function generatePreviewHtml(data: PageData): string {
  const headHtml = generateHeadHtml(data);
  const footerHtml = generateFooterHtml(data);
  const tokens = data.designTokens;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  ${headHtml}
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: ${tokens.fontFamily}; font-size: ${tokens.bodyFontSize}; color: #333; }
    img { max-width: 100%; height: auto; }
    a { color: inherit; }
  </style>
</head>
<body>
  <!-- Simulated HubSpot template structure -->
  <div class="header-new" style="display:none">
    <img src="" alt="FutureStay" style="display:none">
  </div>

  <div class="body-container-wrapper">
    <div class="two_col_gray_banner" style="background: #f5f7fa; padding: 80px 40px 60px;">
      <div class="two-col-flex-box" style="max-width: 1100px; margin: 0 auto; display: flex; gap: 40px; align-items: center; flex-wrap: wrap;">
        <div class="col-lg-6 col-md-12 col-12 left" style="flex: 1; min-width: 300px;">
          <h1 style="font-size: 42px; font-weight: ${tokens.headingFontWeight}; line-height: 1.15; margin-bottom: 16px; color: #1a1a2e;">${data.hero.headline}</h1>
          <p style="font-size: 18px; line-height: 1.6; color: #555; margin-bottom: 24px;">${data.hero.subtext}</p>
          <div class="list-col" style="display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 24px;">
            ${data.hero.trustBadges.map(b => `<span style="display: inline-flex; align-items: center; gap: 6px; font-size: 14px; color: #04D361; font-weight: 600;"><span style="color: #04D361;">${b.icon}</span> <span style="color: #555;">${b.text}</span></span>`).join('')}
          </div>
          <div class="cta-container" style="display: flex; gap: 16px; flex-wrap: wrap;">
            <a href="${data.hero.primaryCtaUrl}" style="display: inline-block; padding: 16px 32px; background: linear-gradient(90.37deg, ${tokens.primaryGradientStart} 8.45%, ${tokens.primaryGradientEnd} 98.1%); color: white; border-radius: ${tokens.buttonBorderRadius}; font-weight: 700; font-size: 16px; text-decoration: none;">${data.hero.primaryCtaText}</a>
            <a href="${data.hero.secondaryCtaUrl}" style="display: inline-block; padding: 16px 32px; border: 2px solid ${tokens.accentColor}; color: ${tokens.accentColor}; border-radius: ${tokens.buttonBorderRadius}; font-weight: 700; font-size: 16px; text-decoration: none; background: transparent;">${data.hero.secondaryCtaText}</a>
          </div>
        </div>
        <div class="col-lg-6 col-md-12 col-12 right" style="flex: 1; min-width: 300px;">
          ${data.hero.heroImageUrl ? `<img src="${data.hero.heroImageUrl}" alt="Hero" style="border-radius: 12px; width: 100%;">` : '<div style="width: 100%; height: 300px; background: linear-gradient(135deg, #e8ecf4 0%, #d4dbe8 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #888; font-size: 14px;">Hero Image</div>'}
        </div>
      </div>
    </div>
  </div>

  ${footerHtml}
</body>
</html>`;
}

export function usePreview() {
  const [previewHtml, setPreviewHtml] = useState('');
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const getPageData = usePageStore((s) => s.getPageData);

  useEffect(() => {
    const unsubscribe = usePageStore.subscribe(() => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        const data = getPageData();
        setPreviewHtml(generatePreviewHtml(data));
      }, 400);
    });

    // Initial render
    const data = getPageData();
    setPreviewHtml(generatePreviewHtml(data));

    return () => {
      unsubscribe();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [getPageData]);

  return previewHtml;
}
