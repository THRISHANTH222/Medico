import { NextResponse } from 'next/server';
import { AccessToken, RoomConfiguration, RoomAgentDispatch } from 'livekit-server-sdk';

export async function POST(req: Request) {
  try {
    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;
    const livekitUrl = process.env.LIVEKIT_URL || process.env.NEXT_PUBLIC_LIVEKIT_URL;

    if (!apiKey || !apiSecret) {
      console.error('[LiveKit Token API] Missing LIVEKIT_API_KEY or LIVEKIT_API_SECRET in environment variables.');
      return NextResponse.json(
        { message: 'Server configuration error: LiveKit credentials missing.' },
        { status: 500 }
      );
    }

    if (!livekitUrl) {
      console.error('[LiveKit Token API] Missing LIVEKIT_URL in environment variables.');
      return NextResponse.json(
        { message: 'Server configuration error: LiveKit URL missing.' },
        { status: 500 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const roomName = body.roomName || `medico-session-${Math.random().toString(36).substring(2, 9)}`;
    const participantIdentity = body.participantName || `user-${Math.random().toString(36).substring(2, 9)}`;
    const agentName = body.agentName || 'my-agent';

    const at = new AccessToken(apiKey, apiSecret, {
      identity: participantIdentity,
      name: 'Medico Patient',
      ttl: '30m',
    });

    at.addGrant({
      roomJoin: true,
      room: roomName,
      canPublish: true,
      canSubscribe: true,
      canPublishData: true,
    });

    // Configure Agent Dispatch for LiveKit Cloud using RoomConfiguration
    at.roomConfig = new RoomConfiguration({
      agents: [
        new RoomAgentDispatch({
          agentName: agentName,
        }),
      ],
    });

    const token = await at.toJwt();

    console.log(`[LiveKit Token API] Token generated for room: ${roomName}, participant: ${participantIdentity}, agent: ${agentName}`);

    return NextResponse.json({
      token,
      participant_token: token,
      url: livekitUrl,
      server_url: livekitUrl,
      roomName,
      identity: participantIdentity,
      agentName,
    });
  } catch (error) {
    console.error('[LiveKit Token API] Error generating access token:', error);
    return NextResponse.json(
      { message: 'Failed to generate connection token. Please try again.' },
      { status: 500 }
    );
  }
}

