import { NextResponse } from 'next/server';
import { generateHeadHtml } from '@/generators/generateHeadHtml';
import { generateFooterHtml } from '@/generators/generateFooterHtml';
import { createLandingPage, updateLandingPageDraft, publishLandingPage } from '@/lib/hubspot';
import { PageData } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const { pageData, pageId, action } = (await request.json()) as {
      pageData: PageData;
      pageId?: string;
      action: 'draft' | 'publish';
    };

    const headHtml = generateHeadHtml(pageData);
    const footerHtml = generateFooterHtml(pageData);

    const payload = {
      name: pageData.pageName,
      slug: pageData.pageSlug,
      headHtml,
      footerHtml,
      htmlTitle: pageData.pageName,
    };

    let resultPageId = pageId;

    if (pageId) {
      await updateLandingPageDraft(pageId, payload);
    } else {
      const result = await createLandingPage(payload);
      resultPageId = result.id;
    }

    if (action === 'publish' && resultPageId) {
      await publishLandingPage(resultPageId);
    }

    return NextResponse.json({
      success: true,
      pageId: resultPageId,
      action,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
