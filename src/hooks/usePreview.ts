'use client';

import { useEffect, useState, useRef } from 'react';
import { usePageStore } from '@/store/pageStore';
import { generateHeadHtml } from '@/generators/generateHeadHtml';
import { generateFooterHtml } from '@/generators/generateFooterHtml';
import { PageData, DesignTokens } from '@/lib/types';
import { textSizeDesktop, textSizeMobile, imageSizeCSS, iconSizePx } from '@/lib/sizePresets';

function grad(tokens: DesignTokens): string {
  return `linear-gradient(90.37deg, ${tokens.primaryGradientStart} 8.45%, ${tokens.primaryGradientEnd} 98.1%)`;
}

function esc(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function stars(rating: number): string {
  const full = Math.min(Math.max(Math.round(rating), 0), 5);
  return '<span style="color: #F6C744; font-size: 18px; letter-spacing: 2px;">' +
    '\u2605'.repeat(full) + '\u2606'.repeat(5 - full) +
    '</span>';
}

function renderHeader(data: PageData, tokens: DesignTokens): string {
  const airbnbSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="vertical-align: middle; margin-right: 6px;"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.949 16.633c-.282.85-.962 1.408-1.81 1.408-.392 0-.78-.113-1.135-.338-.467-.296-1.084-.873-1.74-1.627-.92-1.058-1.81-2.39-2.54-3.807a15.5 15.5 0 0 1-.67-1.585c-.45-1.24-.634-2.297-.534-3.05.076-.578.31-1.03.68-1.31a1.62 1.62 0 0 1 .97-.327c.605 0 1.127.38 1.376.997l.426 1.058c.17.423.336.85.49 1.254.155.41.23.776.23 1.1 0 .453-.147.87-.436 1.235-.186.236-.44.46-.753.668l-.236.157c.393.82.89 1.623 1.47 2.358.637.81 1.316 1.454 1.98 1.878.147-.093.303-.2.458-.318.4-.306.715-.424 1.108-.424.37 0 .728.13 1.035.374.347.276.573.663.673 1.12.1.453.037.91-.186 1.322l-.056.087z"/></svg>`;

  return `
  <header style="
    position: fixed; top: 0; left: 0; right: 0; z-index: 99999;
    background: #ffffff; box-shadow: 0 2px 16px rgba(0,0,0,0.08);
    padding: 0 40px; height: 72px;
    display: flex; align-items: center; justify-content: space-between;
  ">
    <div style="display: flex; align-items: center;">
      ${data.header.logoUrl
        ? `<img src="${esc(data.header.logoUrl)}" alt="Logo" style="height: 36px; width: auto;">`
        : `<span style="font-size: 22px; font-weight: 800; background: ${grad(tokens)}; -webkit-background-clip: text; -webkit-text-fill-color: transparent;">FutureStay</span>`
      }
    </div>
    <div style="display: flex; align-items: center; gap: 12px;">
      <a href="${esc(data.header.secondaryCtaUrl)}" style="
        display: inline-flex; align-items: center;
        padding: 10px 24px; border: 2px solid ${tokens.accentColor};
        color: ${tokens.accentColor}; border-radius: ${tokens.buttonBorderRadius};
        font-weight: 600; font-size: 14px; text-decoration: none;
        background: transparent; white-space: nowrap;
      ">${airbnbSvg}${esc(data.header.secondaryCtaText)}</a>
      <a href="${esc(data.header.primaryCtaUrl)}" style="
        display: inline-flex; align-items: center;
        padding: 10px 24px; background: ${grad(tokens)};
        color: #fff; border-radius: ${tokens.buttonBorderRadius};
        font-weight: 600; font-size: 14px; text-decoration: none;
        white-space: nowrap;
      ">${esc(data.header.primaryCtaText)}</a>
    </div>
  </header>`;
}

function renderHero(data: PageData, tokens: DesignTokens): string {
  const trustBadgesHtml = data.hero.trustBadges.map(b => `
    <span style="display: inline-flex; align-items: center; gap: 6px; font-size: 14px; font-weight: 600;">
      <span style="color: #04D361; font-size: 16px;">${b.icon}</span>
      <span style="color: #3D4244;">${esc(b.text)}</span>
    </span>
  `).join('');

  const airbnbSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="vertical-align: middle; margin-right: 6px;"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.949 16.633c-.282.85-.962 1.408-1.81 1.408-.392 0-.78-.113-1.135-.338-.467-.296-1.084-.873-1.74-1.627-.92-1.058-1.81-2.39-2.54-3.807a15.5 15.5 0 0 1-.67-1.585c-.45-1.24-.634-2.297-.534-3.05.076-.578.31-1.03.68-1.31a1.62 1.62 0 0 1 .97-.327c.605 0 1.127.38 1.376.997l.426 1.058c.17.423.336.85.49 1.254.155.41.23.776.23 1.1 0 .453-.147.87-.436 1.235-.186.236-.44.46-.753.668l-.236.157c.393.82.89 1.623 1.47 2.358.637.81 1.316 1.454 1.98 1.878.147-.093.303-.2.458-.318.4-.306.715-.424 1.108-.424.37 0 .728.13 1.035.374.347.276.573.663.673 1.12.1.453.037.91-.186 1.322l-.056.087z"/></svg>`;

  return `
  <section style="
    background: linear-gradient(180deg, #EFF1F5 0%, #E8EBF0 100%);
    padding: 100px 40px 60px;
  ">
    <div style="max-width: 1140px; margin: 0 auto; display: flex; gap: 48px; align-items: center; flex-wrap: wrap;">
      <div style="flex: 1; min-width: 320px;">
        <h1 class="hero-headline" style="
          font-size: ${textSizeDesktop(data.hero.headlineSize, '4xl')}; font-weight: ${tokens.headingFontWeight};
          line-height: 1.12; margin-bottom: 18px; color: #121314;
          letter-spacing: -0.5px;
        ">${esc(data.hero.headline)}</h1>
        <p class="hero-subtext" style="font-size: ${textSizeDesktop(data.hero.subtextSize, 'lg')}; line-height: 1.65; color: #3D4244; margin-bottom: 24px;">
          ${esc(data.hero.subtext)}
        </p>
        <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-bottom: 28px;">
          ${trustBadgesHtml}
        </div>
        <div style="display: flex; gap: 14px; flex-wrap: wrap;">
          <a href="${esc(data.hero.primaryCtaUrl)}" style="
            display: inline-block; padding: 16px 36px;
            background: ${grad(tokens)}; color: #fff;
            border-radius: ${tokens.buttonBorderRadius};
            font-weight: 700; font-size: 16px; text-decoration: none;
            box-shadow: 0 4px 14px rgba(57, 99, 231, 0.35);
            transition: transform 0.15s;
          ">${esc(data.hero.primaryCtaText)}</a>
          <a href="${esc(data.hero.secondaryCtaUrl)}" style="
            display: inline-flex; align-items: center;
            padding: 16px 36px; border: 2px solid ${tokens.accentColor};
            color: ${tokens.accentColor}; border-radius: ${tokens.buttonBorderRadius};
            font-weight: 700; font-size: 16px; text-decoration: none;
            background: transparent;
          ">${airbnbSvg}${esc(data.hero.secondaryCtaText)}</a>
        </div>
      </div>
      <div style="flex: 1; min-width: 320px;">
        ${data.hero.heroImageUrl
          ? `<img src="${esc(data.hero.heroImageUrl)}" alt="Hero" class="hero-image" style="border-radius: 16px; display: block; ${imageSizeCSS(data.hero.heroImageSize, 'full')}">`
          : `<div style="width: 100%; height: 340px; background: linear-gradient(135deg, #dde2ed 0%, #c8d0e0 100%); border-radius: 16px; display: flex; align-items: center; justify-content: center; color: #888; font-size: 14px;">Hero Image</div>`
        }
      </div>
    </div>
  </section>`;
}

function renderSocialProofBar(data: PageData): string {
  if (!data.socialProofBar.enabled || data.socialProofBar.badges.length === 0) return '';

  const badgesHtml = data.socialProofBar.badges.map(b => `
    <div style="display: flex; align-items: center; gap: 10px; padding: 0 20px;">
      ${b.imageUrl ? `<img src="${esc(b.imageUrl)}" alt="" style="height: 28px; width: auto;">` : ''}
      <span style="font-size: 14px; font-weight: 600; color: #3D4244; white-space: nowrap;">${esc(b.text)}</span>
    </div>
  `).join('<div style="width: 1px; height: 28px; background: #D4D8DD;"></div>');

  return `
  <section style="background: #fff; padding: 28px 40px; border-bottom: 1px solid #EFF1F5;">
    <div style="max-width: 1140px; margin: 0 auto; display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 12px;">
      ${badgesHtml}
    </div>
  </section>`;
}

function renderPartnerLogos(data: PageData): string {
  if (!data.partnerLogos.enabled || data.partnerLogos.logos.length === 0) return '';

  const logosHtml = data.partnerLogos.logos.map(l => `
    <div style="padding: 0 20px; display: flex; align-items: center;">
      <img src="${esc(l.imageUrl)}" alt="${esc(l.name)}" style="
        height: 30px; width: auto; opacity: 0.5;
        filter: grayscale(100%);
      ">
    </div>
  `).join('');

  return `
  <section style="background: #fff; padding: 40px 40px 48px;">
    <div style="max-width: 1140px; margin: 0 auto; display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 16px;">
      ${logosHtml}
    </div>
  </section>`;
}

function renderSteps(data: PageData, tokens: DesignTokens): string {
  if (!data.steps.enabled || data.steps.steps.length === 0) return '';

  const cardsHtml = data.steps.steps.map(step => `
    <div style="
      flex: 1; min-width: 260px; max-width: 360px;
      background: #fff; border-radius: 16px; padding: 36px 28px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.06);
      text-align: center; position: relative;
    ">
      <div style="margin-bottom: 16px;">
        ${step.iconUrl
          ? `<img src="${esc(step.iconUrl)}" alt="${esc(step.title)}" style="width: ${iconSizePx(data.steps.stepIconSize, 'lg')}; height: ${iconSizePx(data.steps.stepIconSize, 'lg')}; margin: 0 auto; display: block;">`
          : `<div style="width: ${iconSizePx(data.steps.stepIconSize, 'lg')}; height: ${iconSizePx(data.steps.stepIconSize, 'lg')}; margin: 0 auto; border-radius: 50%; background: ${grad(tokens)}; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 20px; font-weight: 700;">${esc(step.stepNumber)}</div>`
        }
      </div>
      <div style="
        display: inline-flex; align-items: center; justify-content: center;
        width: 28px; height: 28px; border-radius: 50%;
        background: ${grad(tokens)}; color: #fff;
        font-size: 13px; font-weight: 700; margin-bottom: 14px;
      ">${esc(step.stepNumber)}</div>
      <h3 class="steps-card-title" style="font-size: ${textSizeDesktop(data.steps.cardTitleSize, 'xl')}; font-weight: 700; color: #121314; margin-bottom: 10px;">${esc(step.title)}</h3>
      <p style="font-size: 15px; line-height: 1.6; color: #3D4244;">${esc(step.description)}</p>
    </div>
  `).join('');

  return `
  <section style="background: #F7F8FA; padding: 72px 40px;">
    <div style="max-width: 1140px; margin: 0 auto;">
      <h2 class="steps-title" style="
        font-size: ${textSizeDesktop(data.steps.sectionTitleSize, '3xl')}; font-weight: ${tokens.headingFontWeight};
        text-align: center; color: #121314; margin-bottom: 48px;
        line-height: 1.2;
      ">${esc(data.steps.sectionTitle)}</h2>
      <div style="display: flex; gap: 28px; justify-content: center; flex-wrap: wrap;">
        ${cardsHtml}
      </div>
    </div>
  </section>`;
}

function renderStats(data: PageData, tokens: DesignTokens): string {
  if (!data.stats.enabled || data.stats.stats.length === 0) return '';

  const statsHtml = data.stats.stats.map((stat, i) => `
    <div style="flex: 1; min-width: 180px; text-align: center; padding: 0 16px;">
      <div class="stats-value" style="
        font-size: ${textSizeDesktop(data.stats.valueSize, '4xl')}; font-weight: ${tokens.headingFontWeight};
        color: ${i === 0 ? '#04D361' : '#fff'};
        margin-bottom: 10px; letter-spacing: -1px;
      ">${esc(stat.value)}</div>
      <div class="stats-label" style="font-size: ${textSizeDesktop(data.stats.labelSize, 'sm')}; color: rgba(255,255,255,0.7); line-height: 1.5; max-width: 220px; margin: 0 auto;">
        ${esc(stat.label)}
      </div>
    </div>
  `).join('');

  return `
  <section style="background: #212226; padding: 72px 40px;">
    <div style="max-width: 1140px; margin: 0 auto; display: flex; gap: 24px; justify-content: center; flex-wrap: wrap;">
      ${statsHtml}
    </div>
  </section>`;
}

function renderFeatures(data: PageData, tokens: DesignTokens): string {
  if (!data.features.enabled || data.features.features.length === 0) return '';

  const iconDim = iconSizePx(data.features.featureImageSize, 'md');
  const featureIcon = (imageUrl: string) => {
    if (imageUrl) {
      return `<img src="${esc(imageUrl)}" alt="" style="width: ${iconDim}; height: ${iconDim}; border-radius: 12px;">`;
    }
    return `<div style="
      width: ${iconDim}; height: ${iconDim}; border-radius: 12px;
      background: linear-gradient(135deg, ${tokens.primaryGradientStart}22, ${tokens.primaryGradientEnd}22);
      display: flex; align-items: center; justify-content: center;
    "><svg width="24" height="24" fill="none" stroke="${tokens.primaryGradientStart}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>`;
  };

  const cardsHtml = data.features.features.map(f => `
    <div style="
      flex: 1 1 calc(33.333% - 20px); min-width: 280px; max-width: 380px;
      background: #fff; border-radius: 16px; padding: 32px 28px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.06);
    ">
      <div style="margin-bottom: 16px;">${featureIcon(f.imageUrl)}</div>
      <h3 class="features-card-title" style="font-size: ${textSizeDesktop(data.features.cardTitleSize, 'lg')}; font-weight: 700; color: #121314; margin-bottom: 10px;">${esc(f.title)}</h3>
      <p style="font-size: 15px; line-height: 1.6; color: #3D4244;">${esc(f.description)}</p>
    </div>
  `).join('');

  return `
  <section style="background: #F7F8FA; padding: 72px 40px;">
    <div style="max-width: 1140px; margin: 0 auto;">
      <h2 class="features-title" style="
        font-size: ${textSizeDesktop(data.features.sectionTitleSize, '3xl')}; font-weight: ${tokens.headingFontWeight};
        text-align: center; color: #121314; margin-bottom: 48px;
        line-height: 1.2;
      ">${esc(data.features.sectionTitle)}</h2>
      <div style="display: flex; gap: 24px; flex-wrap: wrap; justify-content: center;">
        ${cardsHtml}
      </div>
    </div>
  </section>`;
}

function renderTestimonials(data: PageData, tokens: DesignTokens): string {
  if (!data.testimonials.enabled || data.testimonials.testimonials.length === 0) return '';

  const cardsHtml = data.testimonials.testimonials.map(t => `
    <div style="
      flex: 1; min-width: 260px; max-width: 300px;
      background: #fff; border-radius: 16px; padding: 32px 24px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.06);
      position: relative;
    ">
      <div style="
        font-size: 48px; font-weight: 800; line-height: 1;
        background: ${grad(tokens)};
        -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        margin-bottom: 12px; opacity: 0.3;
      ">\u201C</div>
      <p class="testimonials-quote" style="font-size: ${textSizeDesktop(data.testimonials.quoteSize, 'base')}; line-height: 1.65; color: #3D4244; margin-bottom: 20px; font-style: italic;">
        ${esc(t.quote)}
      </p>
      <div style="margin-bottom: 8px;">${stars(t.rating)}</div>
      <div style="font-size: 14px; font-weight: 700; color: #121314;">${esc(t.authorName)}</div>
      <div style="font-size: 13px; color: #6B7280;">${esc(t.authorTitle)}</div>
    </div>
  `).join('');

  return `
  <section style="
    background: linear-gradient(135deg, #EEF0F7 0%, #E3E7F3 50%, #EDF0F8 100%);
    padding: 72px 40px; position: relative; overflow: hidden;
  ">
    <div style="
      position: absolute; top: -80px; right: -80px; width: 300px; height: 300px;
      border-radius: 50%; background: ${grad(tokens)}; opacity: 0.04;
    "></div>
    <div style="
      position: absolute; bottom: -60px; left: -60px; width: 200px; height: 200px;
      border-radius: 50%; background: ${grad(tokens)}; opacity: 0.04;
    "></div>
    <div style="max-width: 1140px; margin: 0 auto; position: relative; z-index: 1;">
      <h2 class="testimonials-title" style="
        font-size: ${textSizeDesktop(data.testimonials.sectionTitleSize, '3xl')}; font-weight: ${tokens.headingFontWeight};
        text-align: center; color: #121314; margin-bottom: 48px;
        line-height: 1.2;
      ">${esc(data.testimonials.sectionTitle)}</h2>
      <div style="display: flex; gap: 24px; justify-content: center; flex-wrap: wrap;">
        ${cardsHtml}
      </div>
    </div>
  </section>`;
}

function renderComparison(data: PageData, tokens: DesignTokens): string {
  if (!data.comparison.enabled || data.comparison.rows.length === 0) return '';

  const futureStayColIdx = data.comparison.columns.findIndex(c =>
    c.toLowerCase().includes('futurestay')
  );

  const headerCells = data.comparison.columns.map((col, i) => {
    const isFsCol = i === futureStayColIdx;
    const isFirst = i === 0;
    return `<th style="
      padding: 16px 20px; font-size: 15px; font-weight: 700;
      color: ${isFirst ? '#121314' : '#fff'};
      background: ${isFirst ? '#F7F8FA' : (isFsCol ? grad(tokens) : '#3D4244')};
      text-align: ${isFirst ? 'left' : 'center'};
      ${i === 0 ? 'border-radius: 12px 0 0 0;' : ''}
      ${i === data.comparison.columns.length - 1 ? 'border-radius: 0 12px 0 0;' : ''}
    ">${esc(col)}</th>`;
  }).join('');

  const bodyRows = data.comparison.rows.map((row, rowIdx) => {
    const isLast = rowIdx === data.comparison.rows.length - 1;
    const featureCell = `<td style="
      padding: 14px 20px; font-size: 14px; font-weight: 600; color: #121314;
      background: #F7F8FA; border-bottom: 1px solid #E8EBF0;
      ${isLast ? 'border-radius: 0 0 0 12px;' : ''}
    ">${esc(row.feature)}</td>`;

    const valueCells = row.values.map((val, i) => {
      const colIdx = i + 1;
      const isFsCol = colIdx === futureStayColIdx;
      return `<td style="
        padding: 14px 20px; font-size: 14px; text-align: center;
        color: ${isFsCol ? tokens.primaryGradientStart : '#3D4244'};
        font-weight: ${isFsCol ? '600' : '400'};
        background: ${isFsCol ? `${tokens.primaryGradientStart}08` : '#fff'};
        border-bottom: 1px solid #E8EBF0;
        ${isLast && colIdx === data.comparison.columns.length - 1 ? 'border-radius: 0 0 12px 0;' : ''}
      ">${esc(val)}</td>`;
    }).join('');

    return `<tr>${featureCell}${valueCells}</tr>`;
  }).join('');

  return `
  <section style="background: #fff; padding: 72px 40px;">
    <div style="max-width: 1140px; margin: 0 auto;">
      <h2 class="comparison-title" style="
        font-size: ${textSizeDesktop(data.comparison.sectionTitleSize, '3xl')}; font-weight: ${tokens.headingFontWeight};
        text-align: center; color: #121314; margin-bottom: 48px;
        line-height: 1.2;
      ">${esc(data.comparison.sectionTitle)}</h2>
      <div style="overflow-x: auto; -webkit-overflow-scrolling: touch;">
        <table style="
          width: 100%; border-collapse: separate; border-spacing: 0;
          border-radius: 12px; overflow: hidden;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
          min-width: 600px;
        ">
          <thead><tr>${headerCells}</tr></thead>
          <tbody>${bodyRows}</tbody>
        </table>
      </div>
    </div>
  </section>`;
}

function renderCtaSection(data: PageData, tokens: DesignTokens): string {
  if (!data.ctaSection.enabled) return '';

  const testimonialHtml = data.ctaSection.testimonial ? `
    <div style="margin-top: 28px; padding: 20px; background: rgba(255,255,255,0.12); border-radius: 12px;">
      <p style="font-size: 14px; line-height: 1.6; color: rgba(255,255,255,0.9); font-style: italic; margin-bottom: 8px;">
        \u201C${esc(data.ctaSection.testimonial.quote)}\u201D
      </p>
      <div style="font-size: 13px; color: rgba(255,255,255,0.7);">
        \u2014 ${esc(data.ctaSection.testimonial.authorName)}, ${esc(data.ctaSection.testimonial.authorTitle)}
      </div>
    </div>
  ` : '';

  return `
  <section style="
    background: ${grad(tokens)};
    padding: 72px 40px; position: relative; overflow: hidden;
  ">
    <div style="
      position: absolute; top: -100px; right: -100px; width: 400px; height: 400px;
      border-radius: 50%; background: rgba(255,255,255,0.06);
    "></div>
    <div style="
      position: absolute; bottom: -80px; left: -80px; width: 300px; height: 300px;
      border-radius: 50%; background: rgba(255,255,255,0.04);
    "></div>
    <div style="max-width: 1140px; margin: 0 auto; display: flex; gap: 48px; align-items: center; flex-wrap: wrap; position: relative; z-index: 1;">
      <div style="flex: 1; min-width: 320px;">
        <h2 class="cta-headline" style="
          font-size: ${textSizeDesktop(data.ctaSection.headlineSize, '3xl')}; font-weight: ${tokens.headingFontWeight};
          color: #fff; margin-bottom: 16px; line-height: 1.2;
        ">${esc(data.ctaSection.headline)}</h2>
        <p class="cta-subtext" style="font-size: ${textSizeDesktop(data.ctaSection.subtextSize, 'lg')}; line-height: 1.6; color: rgba(255,255,255,0.85); margin-bottom: 28px;">
          ${esc(data.ctaSection.subtext)}
        </p>
        <a href="${esc(data.ctaSection.ctaUrl)}" style="
          display: inline-block; padding: 16px 40px;
          background: #fff; color: ${tokens.primaryGradientStart};
          border-radius: ${tokens.buttonBorderRadius};
          font-weight: 700; font-size: 16px; text-decoration: none;
          box-shadow: 0 4px 14px rgba(0,0,0,0.15);
        ">${esc(data.ctaSection.ctaText)}</a>
        ${testimonialHtml}
      </div>
      <div style="flex: 1; min-width: 280px;">
        ${data.ctaSection.imageUrl
          ? `<img src="${esc(data.ctaSection.imageUrl)}" alt="CTA" class="cta-image" style="border-radius: 16px; display: block; box-shadow: 0 8px 32px rgba(0,0,0,0.2); ${imageSizeCSS(data.ctaSection.ctaImageSize, 'full')}">`
          : `<div style="width: 100%; height: 300px; background: rgba(255,255,255,0.1); border-radius: 16px; display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.5); font-size: 14px;">CTA Image</div>`
        }
      </div>
    </div>
  </section>`;
}

function renderFaq(data: PageData, tokens: DesignTokens): string {
  if (!data.faq.enabled || data.faq.items.length === 0) return '';

  const itemsHtml = data.faq.items.map((item, i) => `
    <div class="faq-item" style="
      border-bottom: 1px solid #E8EBF0;
    ">
      <button onclick="
        var a = this.nextElementSibling;
        var arrow = this.querySelector('.faq-arrow');
        if (a.style.maxHeight && a.style.maxHeight !== '0px') {
          a.style.maxHeight = '0px';
          a.style.paddingBottom = '0';
          arrow.style.transform = 'rotate(0deg)';
        } else {
          a.style.maxHeight = a.scrollHeight + 20 + 'px';
          a.style.paddingBottom = '20px';
          arrow.style.transform = 'rotate(180deg)';
        }
      " style="
        width: 100%; display: flex; align-items: center; justify-content: space-between;
        padding: 20px 0; background: none; border: none; cursor: pointer;
        text-align: left; font-size: ${textSizeDesktop(data.faq.questionSize, 'lg')}; font-weight: 600; color: #121314;
        font-family: inherit;
      ">
        <span>${esc(item.question)}</span>
        <span class="faq-arrow" style="
          font-size: 20px; color: #3D4244; transition: transform 0.25s ease;
          flex-shrink: 0; margin-left: 16px;
        ">\u25BC</span>
      </button>
      <div style="
        max-height: 0; overflow: hidden; transition: max-height 0.3s ease, padding-bottom 0.3s ease;
        padding-bottom: 0;
      ">
        <p style="font-size: 15px; line-height: 1.7; color: #3D4244; padding-right: 40px;">
          ${esc(item.answer)}
        </p>
      </div>
    </div>
  `).join('');

  return `
  <section style="background: #fff; padding: 72px 40px;">
    <div style="max-width: 780px; margin: 0 auto;">
      <h2 class="faq-title" style="
        font-size: ${textSizeDesktop(data.faq.sectionTitleSize, '3xl')}; font-weight: ${tokens.headingFontWeight};
        text-align: center; color: #121314; margin-bottom: 48px;
        line-height: 1.2;
      ">${esc(data.faq.sectionTitle)}</h2>
      <div>${itemsHtml}</div>
    </div>
  </section>`;
}

function renderFooter(data: PageData, tokens: DesignTokens): string {
  const socialIcons: { key: keyof typeof data.footer.socialLinks; label: string; svg: string }[] = [
    {
      key: 'facebook', label: 'Facebook',
      svg: '<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
    },
    {
      key: 'instagram', label: 'Instagram',
      svg: '<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>',
    },
    {
      key: 'youtube', label: 'YouTube',
      svg: '<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
    },
    {
      key: 'linkedin', label: 'LinkedIn',
      svg: '<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
    },
    {
      key: 'twitter', label: 'X/Twitter',
      svg: '<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    },
  ];

  const socialLinksHtml = socialIcons
    .filter(s => data.footer.socialLinks[s.key])
    .map(s => `
      <a href="${esc(data.footer.socialLinks[s.key])}" target="_blank" rel="noopener noreferrer"
         title="${s.label}" style="
        display: inline-flex; align-items: center; justify-content: center;
        width: 36px; height: 36px; border-radius: 50%;
        background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.7);
        text-decoration: none; transition: background 0.2s;
      ">${s.svg}</a>
    `).join('');

  return `
  <footer style="background: #212226; padding: 56px 40px 32px; color: #fff;">
    <div style="max-width: 1140px; margin: 0 auto;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 32px; margin-bottom: 40px;">
        <div>
          ${data.header.logoUrl
            ? `<img src="${esc(data.header.logoUrl)}" alt="Logo" style="height: 32px; width: auto; filter: brightness(0) invert(1); margin-bottom: 16px;">`
            : `<span style="font-size: 22px; font-weight: 800; color: #fff; display: block; margin-bottom: 16px;">FutureStay</span>`
          }
          ${data.footer.phone ? `<div style="font-size: 14px; color: rgba(255,255,255,0.7); margin-bottom: 6px;">${esc(data.footer.phone)}</div>` : ''}
          ${data.footer.email ? `<div style="font-size: 14px; color: rgba(255,255,255,0.7);"><a href="mailto:${esc(data.footer.email)}" style="color: rgba(255,255,255,0.7); text-decoration: none;">${esc(data.footer.email)}</a></div>` : ''}
        </div>
        <div style="display: flex; gap: 10px; align-items: center;">
          ${socialLinksHtml}
        </div>
      </div>
      <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px; text-align: center;">
        <p style="font-size: 13px; color: rgba(255,255,255,0.45);">${esc(data.footer.copyrightText)}</p>
      </div>
    </div>
  </footer>`;
}

// Map section keys to render functions
const RENDER_MAP: Record<string, (data: PageData, tokens: DesignTokens) => string> = {
  header: (d, t) => renderHeader(d, t),
  hero: (d, t) => renderHero(d, t),
  socialProofBar: (d) => renderSocialProofBar(d),
  partnerLogos: (d) => renderPartnerLogos(d),
  steps: (d, t) => renderSteps(d, t),
  stats: (d, t) => renderStats(d, t),
  features: (d, t) => renderFeatures(d, t),
  testimonials: (d, t) => renderTestimonials(d, t),
  comparison: (d, t) => renderComparison(d, t),
  ctaSection: (d, t) => renderCtaSection(d, t),
  faq: (d, t) => renderFaq(d, t),
  footer: (d, t) => renderFooter(d, t),
};

function generateMobileStyles(data: PageData): string {
  // Generate mobile font-size overrides based on user's selected presets
  return `
    @media (max-width: 768px) {
      body { padding-top: 60px; }
      .hero-headline { font-size: ${textSizeMobile(data.hero.headlineSize, '4xl')} !important; }
      .hero-subtext { font-size: ${textSizeMobile(data.hero.subtextSize, 'lg')} !important; }
      .steps-title { font-size: ${textSizeMobile(data.steps.sectionTitleSize, '3xl')} !important; }
      .steps-card-title { font-size: ${textSizeMobile(data.steps.cardTitleSize, 'xl')} !important; }
      .stats-value { font-size: ${textSizeMobile(data.stats.valueSize, '4xl')} !important; }
      .stats-label { font-size: ${textSizeMobile(data.stats.labelSize, 'sm')} !important; }
      .features-title { font-size: ${textSizeMobile(data.features.sectionTitleSize, '3xl')} !important; }
      .features-card-title { font-size: ${textSizeMobile(data.features.cardTitleSize, 'lg')} !important; }
      .testimonials-title { font-size: ${textSizeMobile(data.testimonials.sectionTitleSize, '3xl')} !important; }
      .testimonials-quote { font-size: ${textSizeMobile(data.testimonials.quoteSize, 'base')} !important; }
      .comparison-title { font-size: ${textSizeMobile(data.comparison.sectionTitleSize, '3xl')} !important; }
      .cta-headline { font-size: ${textSizeMobile(data.ctaSection.headlineSize, '3xl')} !important; }
      .cta-subtext { font-size: ${textSizeMobile(data.ctaSection.subtextSize, 'lg')} !important; }
      .faq-title { font-size: ${textSizeMobile(data.faq.sectionTitleSize, '3xl')} !important; }
    }
  `;
}

function generatePreviewHtml(data: PageData): string {
  const headHtml = generateHeadHtml(data);
  const footerHtml = generateFooterHtml(data);
  const tokens = data.designTokens;

  // Render sections in the user-defined order
  const sections = (data.sectionOrder || [])
    .map(key => RENDER_MAP[key]?.(data, tokens) ?? '')
    .filter(Boolean)
    .join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  ${headHtml}
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: ${tokens.fontFamily};
      font-size: ${tokens.bodyFontSize};
      color: #333;
      padding-top: 72px;
      overflow-x: hidden;
    }
    img { max-width: 100%; height: auto; }
    a { color: inherit; }
    button:focus { outline: none; }
    ${generateMobileStyles(data)}
  </style>
</head>
<body>
  <!-- Hidden HubSpot template structure for deploy compatibility -->
  <div class="header-new" style="display:none">
    <img src="" alt="FutureStay" style="display:none">
  </div>

  <div class="body-container-wrapper">
    ${sections}
  </div>

  <!-- HubSpot deploy code (Head CSS + Footer HTML/JS) -->
  <!--
  === HEAD HTML (for HubSpot Settings > Advanced > Head HTML) ===
  ${headHtml.replace(/-->/g, '--\\>')}
  === FOOTER HTML (for HubSpot Settings > Advanced > Footer HTML) ===
  ${footerHtml.replace(/-->/g, '--\\>')}
  -->
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
