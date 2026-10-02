import { allPrivateFields, salary } from '@content';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import AboutMe from '@src/components/articles/about-me';
import Achievements from '@src/components/articles/achievements';
import ContactInformation from '@src/components/articles/contact-info';
import Professional from '@src/components/articles/professional';
import Skills from '@src/components/articles/skills';
import SoftSkills from '@src/components/articles/soft-skills';
import { PageProperties } from '@src/types/page-properties';

const privateKey = process.env.PRIVATE_KEY;

export default async function Page(
  properties: PageProperties,
): Promise<ReactNode> {
  const parameters = await properties.params;
  const { secret } = parameters;

  // fail closed: no key configured, or the URL's secret doesn't match it
  if (!privateKey || secret !== privateKey) {
    return notFound();
  }

  const privateInformation = allPrivateFields;
  const privateSalary = salary;

  return (
    <div className="container space-y-12">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <AboutMe salary={privateSalary} />
        <ContactInformation privateInformation={privateInformation} />
        <Skills />
        <SoftSkills />
      </div>

      <Professional />
      <Achievements />
    </div>
  );
}
