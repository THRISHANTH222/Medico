import type { Metadata, Viewport } from 'next';
import '@livekit/components-styles';
import './globals.css';

export const metadata: Metadata = {
  title: 'MEDICO — Healthcare guidance, in your language.',
  description:
    'Medico is a multilingual, voice-first AI health assistance and triage prototype designed to make health information accessible in Telugu, Hindi, and English.',
  keywords: [
    'Medico',
    'Voice AI',
    'LiveKit',
    'Gladia STT',
    'MOSS RAG',
    'Health Assistance',
    'Multilingual AI',
    'Telugu Health AI',
    'Hindi Health AI',
  ],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="antialiased bg-slate-950 text-slate-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
