// React
import { FC } from 'react';

// UUID
import { v4 as uuidv4 } from 'uuid';

// Components
import ParkInfoSection from '../ParkInfoSection';

// Custom Types
import { IParkContacts } from '../../customTypes/parks';

// Utils
import { formatPhoneNum } from '../../utils/util';

interface IProps {
  contacts: IParkContacts;
  url: string;
}

const Contact: FC<IProps> = ({ contacts, url }) => {
  return (
    <ParkInfoSection title="Contact Info">
      <ul>
        {contacts.phoneNumbers.map((phoneNum) => {
          if (phoneNum.type === 'Voice') {
            return (
              <li key={uuidv4()}>
                <p>
                  <span className="text-white">Phone:</span> {formatPhoneNum(phoneNum.phoneNumber)}
                </p>
                {phoneNum.extension && <p>Extension: {phoneNum.extension}</p>}
                {phoneNum.description && <p>Description: {phoneNum.description}</p>}
              </li>
            );
          }

          return (
            <li key={uuidv4()}>
              <p>
                <span className="text-white">Fax:</span> {formatPhoneNum(phoneNum.phoneNumber)}
              </p>
              {phoneNum.extension && <p>Extension: {phoneNum.extension}</p>}
              {phoneNum.description && <p>Description: {phoneNum.description}</p>}
            </li>
          );
        })}

        <li>
          <span className="text-white">Website:</span>{' '}
          <a href={url} target="_blank">
            {url}
          </a>
        </li>
      </ul>
    </ParkInfoSection>
  );
};

export default Contact;
