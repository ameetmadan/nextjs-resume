import { renderToBuffer } from '@react-pdf/renderer';
import { NextResponse } from 'next/server';
import Letter from 'src/components/Letter/Letter';

export async function GET(request: Request) {
  const letterStream = await renderToBuffer(<Letter />);

  return new NextResponse(letterStream, {
    headers: {
      'Content-Type': 'application/pdf',
    },
  });
}
