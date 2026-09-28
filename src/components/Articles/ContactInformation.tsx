import { personal } from '@content';
import { IdentificationIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { SectionHeading } from '../SectionHeading/SectionHeading';

export const ContactInformation: React.FC = () => {
  return (
    <article>
      <SectionHeading
        Icon={IdentificationIcon}
        level={3}
        text="Contact Information"
      />

      <ul className="mt-2">
        <li>
          <strong>Location: </strong> {personal.location}
        </li>
        <li>
          <strong>Phone number: </strong>{' '}
          {personal.phoneNumber && (
            <a href={`tel:${personal.phoneNumber.replace(/\s+/g, '')}`}>
              {personal.phoneNumber}
            </a>
          )}
        </li>
        <li>
          <strong>Email: </strong>{' '}
          {personal.email && (
            <a href={`mailto:${personal.email}`}>{personal.email}</a>
          )}
        </li>
        {personal.birthday && (
          <li>
            <strong>Birthday: </strong> {personal.birthday}
          </li>
        )}
        {personal.languages && (
          <li>
            <strong>Languages: </strong> {personal.languages}
          </li>
        )}
        {personal.nationality && (
          <li>
            <strong>Nationality: </strong> {personal.nationality}
          </li>
        )}
        {personal.civilStatus && (
          <li>
            <strong>Civil Status: </strong> {personal.civilStatus}
          </li>
        )}
      </ul>
    </article>
  );
};
