// Custom Types
import { IParkActivity } from '../customTypes/parks';

export const stateList = [
  { value: 'al', label: 'Alabama' },
  { value: 'ak', label: 'Alaska' },
  { value: 'az', label: 'Arizona' },
  { value: 'ar', label: 'Arkansas' },
  { value: 'ca', label: 'California' },
  { value: 'co', label: 'Colorado' },
  { value: 'ct', label: 'Connecticut' },
  { value: 'de', label: 'Delaware' },
  { value: 'dc', label: 'District Of Columbia' },
  { value: 'fl', label: 'Florida' },
  { value: 'ga', label: 'Georgia' },
  { value: 'hi', label: 'Hawaii' },
  { value: 'id', label: 'Idaho' },
  { value: 'il', label: 'Illinois' },
  { value: 'in', label: 'Indiana' },
  { value: 'ia', label: 'Iowa' },
  { value: 'ks', label: 'Kansas' },
  { value: 'ky', label: 'Kentucky' },
  { value: 'la', label: 'Louisiana' },
  { value: 'me', label: 'Maine' },
  { value: 'md', label: 'Maryland' },
  { value: 'ma', label: 'Massachusetts' },
  { value: 'mi', label: 'Michigan' },
  { value: 'mn', label: 'Minnesota' },
  { value: 'ms', label: 'Mississippi' },
  { value: 'mo', label: 'Missouri' },
  { value: 'mt', label: 'Montana' },
  { value: 'ne', label: 'Nebraska' },
  { value: 'nv', label: 'Nevada' },
  { value: 'nh', label: 'New Hampshire' },
  { value: 'nj', label: 'New Jersey' },
  { value: 'nm', label: 'New Mexico' },
  { value: 'ny', label: 'New York' },
  { value: 'nc', label: 'North Carolina' },
  { value: 'nd', label: 'North Dakota' },
  { value: 'oh', label: 'Ohio' },
  { value: 'ok', label: 'Oklahoma' },
  { value: 'pa', label: 'Pennsylvania' },
  { value: 'ri', label: 'Rhode Island' },
  { value: 'sc', label: 'South Carolina' },
  { value: 'tn', label: 'Tennessee' },
  { value: 'tx', label: 'Texas' },
  { value: 'ut', label: 'Utah' },
  { value: 'vt', label: 'Vermont' },
  { value: 'va', label: 'Virginia' },
  { value: 'wa', label: 'Washington' },
  { value: 'wv', label: 'West Virginia' },
  { value: 'wi', label: 'Wisconsin' },
  { value: 'wy', label: 'Wyoming' },
];

export const designationList = [
  { value: 'national park', label: 'national park' },
  { value: 'national historical park', label: 'national historical park' },
  { value: 'national monument', label: 'national monument' },
  { value: 'national historic trail', label: 'national historic trail' },
  { value: 'national historic area', label: 'national historic area' },
  { value: 'national historic site', label: 'national historic site' },
  { value: 'national battlefield', label: 'national battlefield' },
  { value: 'park', label: 'park' },
  { value: 'national memorial', label: 'national memorial' },
  { value: 'national seashore', label: 'national seashore' },
];

export const pageLimitList = [
  { value: 10, label: '10' },
  { value: 20, label: '20' },
  { value: 25, label: '25' },
  { value: 50, label: '50' },
];

export const formatDate = (inputDate: string) => {
  const date = new Date(inputDate);
  return date.toLocaleDateString();
};

export const sortActivitiesByName = (activities: IParkActivity[]) => {
  return activities.sort((a, b) => {
    const nameA = a.name.toUpperCase(); // ignore upper and lowercase
    const nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
};

export const formatPhoneNum = (phoneNum: string) => {
  const phoneArr = phoneNum.split('').filter((item) => !isNaN(Number(item)));
  const areaCode = phoneArr.slice(0, 3).join('');
  const threeDigits = phoneArr.slice(3, 6).join('');
  const fourDigits = phoneArr.slice(6).join('');
  return `${areaCode}-${threeDigits}-${fourDigits}`;
};
