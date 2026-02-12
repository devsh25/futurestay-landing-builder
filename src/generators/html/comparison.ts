import { ComparisonSection, DesignTokens } from '../../lib/types';
import { gradient } from '../../lib/designTokens';

export function generateComparisonHtml(comparison: ComparisonSection, tokens: DesignTokens): string {
  const headerCells = comparison.columns.map((col, i) => {
    if (i === 0) {
      return `        <th>${escapeHtml(col)}</th>`;
    }
    if (i === 1) {
      // FutureStay column gets gradient styling inline as a reinforcement
      return `        <th style="background:${gradient(tokens)};color:#fff;">${escapeHtml(col)}</th>`;
    }
    return `        <th>${escapeHtml(col)}</th>`;
  }).join('\n');

  const bodyRows = comparison.rows.map((row) => {
    const cells = [
      `        <td>${escapeHtml(row.feature)}</td>`,
      ...row.values.map((val, i) => {
        const displayVal = formatCellValue(val);
        if (i === 0) {
          // FutureStay column
          return `        <td>${displayVal}</td>`;
        }
        return `        <td>${displayVal}</td>`;
      }),
    ].join('\n');

    return `      <tr>\n${cells}\n      </tr>`;
  }).join('\n');

  return `<div id="pdf-comparison-table">
  <h2 class="pdf-comp-title">${escapeHtml(comparison.sectionTitle)}</h2>
  <div style="overflow-x:auto;">
    <table class="pdf-comp-table">
      <thead>
      <tr>
${headerCells}
      </tr>
      </thead>
      <tbody>
${bodyRows}
      </tbody>
    </table>
  </div>
</div>`;
}

function formatCellValue(val: string): string {
  // Render checkmarks and x marks with appropriate classes
  if (val === 'true' || val === 'yes' || val === '\u2713') {
    return '<span class="check-mark">\u2713</span>';
  }
  if (val === 'false' || val === 'no' || val === '\u2717') {
    return '<span style="color:#ccc;">\u2717</span>';
  }
  return escapeHtml(val);
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
