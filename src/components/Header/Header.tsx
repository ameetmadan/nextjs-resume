import { personal } from '@content';
import Image from 'next/image';
import React from 'react';
import { fullName } from '../../helpers/utils';
import { Heading } from '../Heading/Heading';
import PDFDownloadButton from '../PDF/PDFDownloadButton';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <div className="mb-12 border-b-2 border-neutral-4 py-12">
      <div className="container">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
          <Image
            alt={fullName}
            className="rounded-full object-cover"
            height={96}
            priority
            src="/portrait.png"
            width={96}
          />
          <div className="flex-1 space-y-2">
            <Heading level={1}>{fullName}</Heading>
            <Heading color="neutralSubtle" className="text-balance" level={2}>
              {personal.title}
            </Heading>
          </div>
          <div className="flex flex-col items-center gap-2 md:items-end">
            <div className="flex flex-col gap-3 sm:flex-row">
              <PDFDownloadButton
                text="Download fullstack CV"
                link={`/api/pdf/fullstack`}
              />
              <PDFDownloadButton
                text="Download frontend CV"
                link={`/api/pdf/frontend`}
              />
            </div>
            <p className="text-sm text-neutral-11">
              Two versions available — pick whichever matches the role
              you&apos;re looking at.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
