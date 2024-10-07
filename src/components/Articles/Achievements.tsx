import { AcademicCapIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { sortedAchievements } from 'src/helpers/utils';
import { SectionHeading } from '../SectionHeading/SectionHeading';
import AchievementItem from './AchievementItem';

const Achievements: React.FC = () => {
  return (
    <article className="rounded-xl bg-neutral-3 py-8">
      <div className="container">
        <div className="flex justify-center text-center">
          <SectionHeading Icon={AcademicCapIcon} level={2} text="Education" />
        </div>

        {sortedAchievements.map((achievement) => (
          <AchievementItem key={achievement._id} {...achievement} />
        ))}
      </div>
    </article>
  );
};

export default Achievements;
