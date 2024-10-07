import { renderToBuffer } from '@react-pdf/renderer';
import { NextResponse } from 'next/server';
import PDF from 'src/components/PDF/PDF';

export async function GET(request: Request) {
  const pdfStream = await renderToBuffer(<PDF />);

  return new NextResponse(pdfStream, {
    headers: {
      'Content-Type': 'application/pdf',
    },
  });
}
