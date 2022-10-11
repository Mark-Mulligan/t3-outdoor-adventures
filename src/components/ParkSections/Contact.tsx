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
    <ParkInfoSection id="contact-info" title="Contact Info">
      <ul>
        {contacts.phoneNumbers.map((phoneNum) => {
          if (phoneNum.type === 'Voice') {
            return (
              <li key={uuidv4()}>
                <p>
                  <span className="font-bold">Phone:</span>{' '}
                  <span className="font-light">{formatPhoneNum(phoneNum.phoneNumber)}</span>
                </p>
                {phoneNum.extension && <p>Extension: {phoneNum.extension}</p>}
                {phoneNum.description && <p>Description: {phoneNum.description}</p>}
              </li>
            );
          }

          return (
            <li key={uuidv4()}>
              <p>
                <span className="font-bold">Fax:</span> {formatPhoneNum(phoneNum.phoneNumber)}
              </p>
              {phoneNum.extension && <p>Extension: {phoneNum.extension}</p>}
              {phoneNum.description && <p>Description: {phoneNum.description}</p>}
            </li>
          );
        })}

        <li>
          <span className="font-bold">Website:</span>{' '}
          <a href={url} target="_blank" className="font-light">
            {url}
          </a>
        </li>
      </ul>
    </ParkInfoSection>
  );
};

export default Contact;
