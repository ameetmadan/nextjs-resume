import { DocumentIcon } from '@heroicons/react/24/solid';
import React from 'react';
import ButtonLink from '../Button/ButtonLink';

interface PDFDownloadButtonProps {
  text: string;
  link: string;
}

const PDFDownloadButton: React.FC<PDFDownloadButtonProps> = ({
  link,
  text,
}) => {
  return (
    <ButtonLink href={link} size="lg">
      <DocumentIcon className="h-6" />
      {text}
    </ButtonLink>
  );
};

export default PDFDownloadButton;
