export interface IParkActivity {
  id: string;
  name: string;
}

interface IParkAddress {
  city: string;
  line1: string;
  line2: string;
  line3: string;
  postalCode: string;
  stateCode: string;
  type: string;
}

export interface IParkContacts {
  emailAddresses: {
    description: string;
    emailAddress: string;
  }[];
  phoneNumbers: {
    description: string;
    extension: string;
    phoneNumber: string;
    type: 'Voice' | 'Fax';
  }[];
}

interface IParkEntranceFee {
  cost: string;
  description: string;
  title: string;
}

interface IParkEntrancePass {
  cost: string;
  description: string;
  title: string;
}

export interface IParkImage {
  altText: string;
  caption: string;
  credit: string;
  title: string;
  url: string;
}

export interface IParkHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export interface IParkOperatingHours {
  description: string;
  exceptions: {
    endDate: string;
    exceptionHours: IParkHours | {};
    name: string;
    startDate: string;
  }[];
  name: string;
  standardHours: IParkHours;
}

interface IParkTopic {
  id: string;
  name: string;
}

export interface IParkData {
  activities: IParkActivity[];
  addresses: IParkAddress[];
  contacts: IParkContacts;
  description: string;
  designation: string;
  directionsInfo: string;
  directionsUrl: string;
  entranceFees: IParkEntranceFee[];
  entrancePasses: IParkEntrancePass[];
  fees: [];
  fullName: string;
  id: string;
  images: IParkImage[];
  latLong: string;
  latitude: string;
  longitude: string;
  operatingHours: IParkOperatingHours[];
  parkCode: string;
  states: string;
  topics: IParkTopic[];
  url: string;
  weatherInfo: string;
}

export interface IParkDataResponse {
  data: IParkData[];
  limit: string;
  start: string;
  total: string;
}

export interface ParkTableData {
  id: string;
  fullname: string;
  parkcode: string;
  states: string;
  designation: string;
}
