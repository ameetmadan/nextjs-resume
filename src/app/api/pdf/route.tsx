import { renderToBuffer } from '@react-pdf/renderer';
import { NextResponse } from 'next/server';
import PDFDynamic from '@src/components/pdf/pdf-dynamic';
import { loadContent } from '@src/helpers/content-loader';

// content only changes on deploy, so render once and cache the result
// instead of re-rendering on every request
export const dynamic = 'force-static';

export async function GET(): Promise<NextResponse> {
  const content = await loadContent();
  const pdfStream = await renderToBuffer(<PDFDynamic content={content} />);

  return new NextResponse(pdfStream as BodyInit, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="resume.pdf"',
    },
  });
}
