import { TextSize, ImageSize } from './types';

// Text size presets: desktop and mobile pixel values
// Mobile values ensure readability on small screens
export const TEXT_SIZE_MAP: Record<TextSize, { desktop: string; mobile: string }> = {
  'sm':   { desktop: '14px', mobile: '13px' },
  'base': { desktop: '16px', mobile: '15px' },
  'lg':   { desktop: '18px', mobile: '16px' },
  'xl':   { desktop: '22px', mobile: '18px' },
  '2xl':  { desktop: '28px', mobile: '22px' },
  '3xl':  { desktop: '34px', mobile: '26px' },
  '4xl':  { desktop: '44px', mobile: '32px' },
};

// Image size presets for hero/CTA images (max-height based)
export const IMAGE_SIZE_MAP: Record<ImageSize, { maxHeight: string; css: string }> = {
  'sm':   { maxHeight: '120px', css: 'max-height: 120px; width: auto;' },
  'md':   { maxHeight: '200px', css: 'max-height: 200px; width: auto;' },
  'lg':   { maxHeight: '340px', css: 'max-height: 340px; width: auto;' },
  'xl':   { maxHeight: '480px', css: 'max-height: 480px; width: auto;' },
  'full': { maxHeight: 'none',  css: 'max-height: none; width: 100%;' },
};

// Icon size presets for step/feature icons (fixed dimensions)
export const ICON_SIZE_MAP: Record<Exclude<ImageSize, 'full'>, string> = {
  'sm': '36px',
  'md': '48px',
  'lg': '56px',
  'xl': '72px',
};

// Helper: returns the desktop font-size string
export function textSizeDesktop(size: TextSize | undefined, fallback: TextSize): string {
  return TEXT_SIZE_MAP[size ?? fallback].desktop;
}

// Helper: returns the mobile font-size string
export function textSizeMobile(size: TextSize | undefined, fallback: TextSize): string {
  return TEXT_SIZE_MAP[size ?? fallback].mobile;
}

// Helper: returns inline CSS string for image sizing
export function imageSizeCSS(size: ImageSize | undefined, fallback: ImageSize): string {
  return IMAGE_SIZE_MAP[size ?? fallback].css;
}

// Helper: returns icon pixel dimension string
export function iconSizePx(size: ImageSize | undefined, fallback: Exclude<ImageSize, 'full'>): string {
  const s = size ?? fallback;
  if (s === 'full') return ICON_SIZE_MAP['xl']; // 'full' doesn't make sense for icons, cap at xl
  return ICON_SIZE_MAP[s];
}

// Labels for UI display
export const TEXT_SIZE_LABELS: Record<TextSize, string> = {
  'sm': 'S',
  'base': 'M',
  'lg': 'L',
  'xl': 'XL',
  '2xl': '2XL',
  '3xl': '3XL',
  '4xl': '4XL',
};

export const IMAGE_SIZE_LABELS: Record<ImageSize, string> = {
  'sm': 'S',
  'md': 'M',
  'lg': 'L',
  'xl': 'XL',
  'full': 'Full',
};
