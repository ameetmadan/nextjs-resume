import { DocumentIcon } from '@heroicons/react/24/solid';
import { ReactNode } from 'react';
import { Button } from '@src/components/button/button';

interface PDFDownloadButtonProperties {
  link: string;
  text: string;
}

export default function PDFDownloadButton({
  link,
  text,
}: PDFDownloadButtonProperties): ReactNode {
  return (
    <Button asChild size="lg">
      <a href={link}>
        <DocumentIcon />
        {text}
      </a>
    </Button>
  );
}
