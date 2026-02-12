import { NextResponse } from 'next/server';

export async function GET() {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;

  if (!token || token === 'your-hubspot-private-app-token-here') {
    return NextResponse.json({
      connected: false,
      error: 'HUBSPOT_ACCESS_TOKEN not configured',
    });
  }

  try {
    const res = await fetch('https://api.hubapi.com/integrations/v1/me', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json({
        connected: true,
        portalId: data.portalId,
      });
    }

    return NextResponse.json({
      connected: false,
      error: `HubSpot returned ${res.status}`,
    });
  } catch (err) {
    return NextResponse.json({
      connected: false,
      error: err instanceof Error ? err.message : 'Connection failed',
    });
  }
}
