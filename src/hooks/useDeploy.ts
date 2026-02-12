'use client';

import { useState } from 'react';
import { usePageStore } from '@/store/pageStore';
import { generateHeadHtml } from '@/generators/generateHeadHtml';
import { generateFooterHtml } from '@/generators/generateFooterHtml';

interface DeployResult {
  success: boolean;
  pageId?: string;
  error?: string;
}

export function useDeploy() {
  const [result, setResult] = useState<DeployResult | null>(null);
  const getPageData = usePageStore((s) => s.getPageData);
  const setIsDeploying = usePageStore((s) => s.setIsDeploying);

  const getGeneratedCode = () => {
    const data = getPageData();
    return {
      headHtml: generateHeadHtml(data),
      footerHtml: generateFooterHtml(data),
    };
  };

  const deploy = async (action: 'draft' | 'publish', targetPageId?: string) => {
    setIsDeploying(true);
    setResult(null);

    try {
      const data = getPageData();
      const response = await fetch('/api/hubspot/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageData: data,
          pageId: targetPageId || data.hubspotPageId,
          action,
        }),
      });

      const json = await response.json();

      if (response.ok) {
        setResult({ success: true, pageId: json.pageId });
      } else {
        setResult({ success: false, error: json.error || 'Deploy failed' });
      }
    } catch (err) {
      setResult({
        success: false,
        error: err instanceof Error ? err.message : 'Network error',
      });
    } finally {
      setIsDeploying(false);
    }
  };

  return { deploy, result, getGeneratedCode };
}
