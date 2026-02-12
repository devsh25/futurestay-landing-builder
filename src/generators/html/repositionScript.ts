import { PageData } from '../../lib/types';

export function generateRepositionScript(data: PageData): string {
  return `document.addEventListener('DOMContentLoaded', function() {
  // 1. Move sticky header to top of body
  var header = document.getElementById('custom-sticky-header');
  if (header && header.parentNode !== document.body || (header && document.body.firstChild !== header)) {
    document.body.insertBefore(header, document.body.firstChild);
  }

  // 2. Find real logo from original header and replace SVG placeholder
  var originalHeader = document.querySelector('.header-new');
  if (originalHeader) {
    var realLogoImg = originalHeader.querySelector('img');
    if (realLogoImg && realLogoImg.src) {
      var svgPlaceholder = document.querySelector('.csh-logo-svg');
      if (svgPlaceholder) {
        var newImg = document.createElement('img');
        newImg.src = realLogoImg.src;
        newImg.alt = 'FutureStay';
        svgPlaceholder.parentNode.replaceChild(newImg, svgPlaceholder);
      }
    }
  }

  // 3. Hide the text span next to logo (since real logo replaces it)
  var logoText = document.querySelector('.csh-logo-text');
  if (logoText) {
    logoText.style.display = 'none';
  }

  // 4. FAQ accordion toggle
  var faqButtons = document.querySelectorAll('.faq-question');
  for (var i = 0; i < faqButtons.length; i++) {
    faqButtons[i].addEventListener('click', function() {
      var item = this.parentElement;
      if (item.classList.contains('open')) {
        item.classList.remove('open');
      } else {
        item.classList.add('open');
      }
    });
  }
});`;
}
