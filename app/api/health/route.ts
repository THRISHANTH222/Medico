import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;
  const livekitUrl = process.env.LIVEKIT_URL || process.env.NEXT_PUBLIC_LIVEKIT_URL;

  const livekitConfigured = Boolean(apiKey && apiSecret && livekitUrl);

  return NextResponse.json({
    status: 'ok',
    livekitConfigured,
  });
}

