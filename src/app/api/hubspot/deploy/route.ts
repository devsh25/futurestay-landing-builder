import { NextResponse } from 'next/server';
import { generateHeadHtml } from '@/generators/generateHeadHtml';
import { generateFooterHtml } from '@/generators/generateFooterHtml';
import { createLandingPage, updateLandingPageDraft, publishLandingPage } from '@/lib/hubspot';
import { PageData } from '@/lib/types';

export async function POST(request: Request) {
  try {
    // Check token is configured
    const token = process.env.HUBSPOT_ACCESS_TOKEN;
    if (!token || token === 'your-hubspot-private-app-token-here') {
      return NextResponse.json(
        {
          error:
            'HubSpot access token not configured. Add your Private App token to .env.local as HUBSPOT_ACCESS_TOKEN, then restart the dev server.',
        },
        { status: 401 }
      );
    }

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
      templatePath: 'Futurestay_theme/templates/Booking.html',
      // Empty dnd_area prevents the template from rendering its default modules.
      // All visible content comes from headHtml (CSS) and footerHtml (HTML + JS).
      layoutSections: {
        dnd_area: {
          cells: [],
          cssClass: '',
          cssId: '',
          cssStyle: '',
          label: 'Main section',
          name: 'dnd_area',
          params: {},
          rowMetaData: [],
          rows: [],
          type: 'cell',
          w: 12,
          x: 0,
        },
      },
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
