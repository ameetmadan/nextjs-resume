import { renderToBuffer } from '@react-pdf/renderer';
import { NextResponse } from 'next/server';
import Letter from '@src/components/letter/letter';

// content only changes on deploy, so render once and cache the result
// instead of re-rendering on every request
export const dynamic = 'force-static';

export async function GET(): Promise<NextResponse> {
  const letterStream = await renderToBuffer(<Letter />);

  return new NextResponse(letterStream as BodyInit, {
    headers: {
      'Content-Type': 'application/pdf',
    },
  });
}
