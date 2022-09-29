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
  console.log(operatingHours);

  const renderExceptionHours = (exceptionHours: any) => {
    if (Object.keys(exceptionHours).length > 0) {
      return (
        <ul>
          {hoursAccessKeys.map((accessKey) => {
            return (
              <li className="flex">
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
    <ParkInfoSection title="Operating Hours">
      <ul>
        {operatingHours.map((hoursData) => {
          return (
            <li key={uuidv4()} className="mb-6">
              <h3 className="text-white text-2xl mb-2">{hoursData.name}</h3>
              <p className="mb-2">{hoursData.description}</p>
              <div className="grid grid-cols-2">
                <div>
                  <h4 className="text-white text-lg mb-3">Standard Hours</h4>
                  <ul>
                    {hoursAccessKeys.map((accessKey) => {
                      return (
                        <li key={uuidv4()} className="flex">
                          <span className="w-14">{accessKey.label}</span>
                          <span>{hoursData.standardHours[accessKey.key]}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div>
                  <h4 className="text-white text-lg mb-3">Holiday Hours</h4>
                  <ul>
                    {hoursData.exceptions.map((exception) => {
                      const exceptionHours = exception.exceptionHours;

                      return (
                        <li key={uuidv4()} className="mb-4">
                          <h4 className="text-gray-300 italic">
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
