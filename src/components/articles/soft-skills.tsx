import { allSoftSkills } from '@content';
import { SparklesIcon } from '@heroicons/react/24/solid';
import { ReactNode } from 'react';
import Prose from '@src/components/prose/prose';
import SectionHeading from '@src/components/section-heading/section-heading';

export default function SoftSkills(): ReactNode {
  return (
    <article className="space-y-4 md:col-span-2">
      <SectionHeading Icon={SparklesIcon} level={3} text="Soft Skills" />

      <div className="grid grid-flow-row grid-cols-3 gap-x-6 gap-y-2 lg:grid-flow-col">
        {allSoftSkills.map((skill) => (
          <Prose
            className="text-neutral-11"
            html={skill.body.html}
            key={skill._id}
          />
        ))}
      </div>
    </article>
  );
}
