import { renderToBuffer } from '@react-pdf/renderer';
import { NextResponse } from 'next/server';
import PDFDynamic from 'src/components/PDF/PDFDynamic';
import { loadContent } from 'src/helpers/contentLoader';

export async function GET(request: Request) {
  const content = await loadContent('frontend');
  const pdfStream = await renderToBuffer(<PDFDynamic content={content} />);

  return new NextResponse(pdfStream, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="resume-frontend.pdf"',
    },
  });
}
