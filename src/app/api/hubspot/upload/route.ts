import { NextRequest, NextResponse } from 'next/server';

const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN || '';
const UPLOAD_FOLDER = '/landing-builder-assets';

export async function POST(request: NextRequest) {
  try {
    if (!HUBSPOT_ACCESS_TOKEN) {
      return NextResponse.json(
        { error: 'HubSpot access token not configured' },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/svg+xml', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: `Invalid file type: ${file.type}. Allowed: PNG, JPG, GIF, SVG, WebP` },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 10MB.' },
        { status: 400 }
      );
    }

    // Build the multipart form for HubSpot File Manager API
    const hubspotForm = new FormData();
    hubspotForm.append('file', file, file.name);
    hubspotForm.append('options', JSON.stringify({
      access: 'PUBLIC_INDEXABLE',
      overwrite: false,
      duplicateValidationStrategy: 'NONE',
      duplicateValidationScope: 'ENTIRE_PORTAL',
    }));
    hubspotForm.append('folderPath', UPLOAD_FOLDER);

    const res = await fetch('https://api.hubapi.com/filemanager/api/v3/files/upload', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
      },
      body: hubspotForm,
    });

    if (!res.ok) {
      const errorBody = await res.text();
      console.error('HubSpot upload error:', res.status, errorBody);
      return NextResponse.json(
        { error: `HubSpot upload failed: ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();

    // HubSpot returns the file object with a URL
    const fileUrl = data.objects?.[0]?.url || data.url || '';

    return NextResponse.json({
      url: fileUrl,
      name: data.objects?.[0]?.name || file.name,
      id: data.objects?.[0]?.id || data.id,
      size: file.size,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}
