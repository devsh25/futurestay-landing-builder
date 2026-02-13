const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN || '';
const HUBSPOT_PORTAL_ID = process.env.HUBSPOT_PORTAL_ID || '41507364';

const BASE_URL = 'https://api.hubapi.com';

async function hubspotFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
      ...options.headers,
    },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`HubSpot API error ${res.status}: ${body}`);
  }

  return res.json();
}

export async function listLandingPages() {
  return hubspotFetch('/cms/v3/pages/landing-pages?limit=50&sort=-updatedAt');
}

export async function getLandingPage(pageId: string) {
  return hubspotFetch(`/cms/v3/pages/landing-pages/${pageId}`);
}

interface CreatePagePayload {
  name: string;
  slug: string;
  headHtml: string;
  footerHtml: string;
  htmlTitle?: string;
  metaDescription?: string;
  templatePath?: string;
}

export async function createLandingPage(payload: CreatePagePayload) {
  return hubspotFetch('/cms/v3/pages/landing-pages', {
    method: 'POST',
    body: JSON.stringify({
      ...payload,
      state: 'DRAFT',
    }),
  });
}

export async function updateLandingPageDraft(pageId: string, payload: Partial<CreatePagePayload>) {
  return hubspotFetch(`/cms/v3/pages/landing-pages/${pageId}/draft`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export async function publishLandingPage(pageId: string) {
  return hubspotFetch(`/cms/v3/pages/landing-pages/${pageId}/draft/push-live`, {
    method: 'POST',
    body: JSON.stringify({}),
  });
}

export function getPortalId() {
  return HUBSPOT_PORTAL_ID;
}
