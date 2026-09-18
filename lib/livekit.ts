export interface ConnectionDetails {
  token: string;
  url: string;
  roomName: string;
}

export async function fetchLiveKitToken(): Promise<ConnectionDetails> {
  const response = await fetch('/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Failed to connect to authentication server' }));
    throw new Error(errorData.message || `Token generation failed with status ${response.status}`);
  }

  const data = await response.json();
  if (!data.token || !data.url) {
    throw new Error('Invalid token response received from server.');
  }

  return data;
}
