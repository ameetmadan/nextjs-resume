import { PrivateField, personal } from '@content';
import { IdentificationIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { SectionHeading } from '../SectionHeading/SectionHeading';

interface ContactInformationProps {
  privateInformation?: PrivateField[];
}

export const ContactInformation: React.FC<ContactInformationProps> = ({
  privateInformation,
}) => {
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
        {/* <li>
          <strong>Address: </strong> {personal.address}
        </li> */}
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

        {/* private access required */}
        {/* {privateInformation?.map((privateField) => (
          <li className="mt-3" key={privateField.label}>
            <strong>{privateField.label}</strong>{' '}
            <div dangerouslySetInnerHTML={{ __html: privateField.body.html }} />
          </li>
        ))} */}
      </ul>
    </article>
  );
};
