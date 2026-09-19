export interface ConnectionDetails {
  token: string;
  participant_token?: string;
  url: string;
  server_url?: string;
  roomName: string;
  agentName?: string;
}

export async function fetchLiveKitToken(agentName = 'my-agent'): Promise<ConnectionDetails> {
  const response = await fetch('/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ agentName }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Failed to connect to token server' }));
    throw new Error(`[TOKEN_ENDPOINT_ERROR] ${errorData.message || `Token generation failed with status ${response.status}`}`);
  }

  const data = await response.json();
  const token = data.token || data.participant_token;
  const url = data.url || data.server_url;

  if (!token || !url) {
    throw new Error('[TOKEN_ENDPOINT_ERROR] Invalid token response received from server.');
  }

  return { ...data, token, url };
}

