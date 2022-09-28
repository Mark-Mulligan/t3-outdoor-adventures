// React
import { FC } from "react";

// Components
import ParkInfoSection from "../ParkInfoSection";

// Custom Types
import { IParkActivity } from "../../customTypes/parks";

// Utils
import { sortActivitiesByName } from "../../utils/util";

interface IProps {
  activities: IParkActivity[];
}

const Activities: FC<IProps> = ({ activities }) => {
  const sortedActivities = sortActivitiesByName(activities);

  const renderActivities = () => {
    const numActivities = sortedActivities.length;

    if (numActivities < 4) {
      return (
        <ul>
          {sortedActivities.map((activity) => (
            <li>{activity.name}</li>
          ))}
        </ul>
      );
    }

    const midPoint = Math.ceil(numActivities / 2);
    const column1Acts = sortedActivities.slice(0, midPoint);
    const column2Acts = sortedActivities.slice(midPoint);

    return (
      <ul className="grid grid-cols-2">
        <div>
          {column1Acts.map((activity) => (
            <li>{activity.name}</li>
          ))}
        </div>
        <div>
          {column2Acts.map((activity) => (
            <li>{activity.name}</li>
          ))}
        </div>
      </ul>
    );
  };

  return <ParkInfoSection title="Activities">{renderActivities()}</ParkInfoSection>;
};

export default Activities;
