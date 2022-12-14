// React
import { FC } from 'react';

// UUID
import { v4 as uuidv4 } from 'uuid';

// Components
import ParkInfoSection from '../ParkInfoSection';

// Custom Types
import { IParkOperatingHours, IParkHours } from '../../customTypes/parks';

// Utils
import { formatDate } from '../../utils/util';

const hoursAccessKeys: { key: keyof IParkHours; label: string }[] = [
  { key: 'monday', label: 'Mon' },
  { key: 'tuesday', label: 'Tue' },
  { key: 'wednesday', label: 'Wed' },
  { key: 'thursday', label: 'Thu' },
  { key: 'friday', label: 'Fri' },
  { key: 'saturday', label: 'Sat' },
  { key: 'sunday', label: 'Sun' },
];

const formatStartAndEndDate = (startDate: string, endDate: string) => {
  if (startDate === endDate) {
    return formatDate(startDate);
  }

  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
};

interface IProps {
  operatingHours: IParkOperatingHours[];
}

const ParkHours: FC<IProps> = ({ operatingHours }) => {
  const renderExceptionHours = (exceptionHours: IParkHours | Record<string, never>) => {
    if (Object.keys(exceptionHours).length > 0) {
      return (
        <ul>
          {hoursAccessKeys.map((accessKey) => {
            return (
              <li className="flex font-light" key={uuidv4()}>
                <span className="w-14">{accessKey.label}</span> <span>{exceptionHours[accessKey.key]}</span>
              </li>
            );
          })}
        </ul>
      );
    }

    return null;
  };

  return (
    <ParkInfoSection id="hours" title="Operating Hours">
      <ul>
        {operatingHours.map((hoursData) => {
          return (
            <li key={uuidv4()} className="mb-6">
              <h3 className="font-semibold text-2xl mb-2">{hoursData.name}</h3>
              <p className="mb-4 font-light">{hoursData.description}</p>
              <div className="grid md:grid-cols-2 grid-col-1">
                <div className="mb-4">
                  <h4 className="font-bold text-lg mb-3">Standard Hours</h4>
                  <ul>
                    {hoursAccessKeys.map((accessKey) => {
                      return (
                        <li key={uuidv4()} className="flex font-light">
                          <span className="w-14">{accessKey.label}</span>
                          <span>{hoursData.standardHours[accessKey.key]}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-3">Holiday Hours</h4>
                  <ul>
                    {hoursData.exceptions.length === 0 && <li className="font-light">N/A</li>}
                    {hoursData.exceptions.map((exception) => {
                      const exceptionHours = exception.exceptionHours;

                      return (
                        <li key={uuidv4()} className="mb-4">
                          <h4 className="italic font-semibold">
                            {exception.name} ({formatStartAndEndDate(exception.startDate, exception.endDate)})
                          </h4>

                          {renderExceptionHours(exceptionHours)}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </ParkInfoSection>
  );
};

export default ParkHours;
