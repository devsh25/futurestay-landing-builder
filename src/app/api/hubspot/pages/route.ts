import { NextResponse } from 'next/server';
import { listLandingPages } from '@/lib/hubspot';

export async function GET() {
  try {
    const data = await listLandingPages();
    return NextResponse.json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
