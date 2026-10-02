import { personal } from '@content';
import Image from 'next/image';
import { ReactNode } from 'react';
import { Heading } from '@src/components/heading/heading';
import PDFDownloadButton from '@src/components/pdf/pdf-download-button';
import { ThemeToggle } from '@src/components/theme-toggle/theme-toggle';
import { fullName } from '@src/helpers/utilities';

export default function Header(): ReactNode {
  return (
    <header className="border-neutral-6 bg-neutral-1 border-b py-12">
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
            <Heading color="muted" className="text-balance" level={2}>
              {personal.title}
            </Heading>
          </div>
          <div className="flex flex-col items-center gap-2 md:items-end">
            <div className="flex flex-col gap-3 sm:flex-row">
              <PDFDownloadButton
                link="/api/pdf/fullstack"
                text="Download fullstack CV"
              />
              <PDFDownloadButton
                link="/api/pdf/frontend"
                text="Download frontend CV"
              />
            </div>
            <p className="text-neutral-11 text-sm">
              Two versions available — pick whichever matches the role
              you&apos;re looking at.
            </p>
          </div>
          <ThemeToggle
            buttonTextVisible={false}
            labelButton="Select theme"
            labelMenu="Select theme"
            themeNameDark="Dark"
            themeNameLight="Light"
            themeNameSystem="System"
          />
        </div>
      </div>
    </header>
  );
}
