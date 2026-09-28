import { renderToBuffer } from '@react-pdf/renderer';
import { NextResponse } from 'next/server';
import Letter from 'src/components/Letter/Letter';

// content only changes on deploy, so render once and cache the result
// instead of re-rendering (and re-fetching fonts) on every request
export const dynamic = 'force-static';

export async function GET(request: Request) {
  const letterStream = await renderToBuffer(<Letter />);

  return new NextResponse(letterStream, {
    headers: {
      'Content-Type': 'application/pdf',
    },
  });
}
