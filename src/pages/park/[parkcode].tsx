// Next
import type { NextPage, NextPageContext } from 'next';
import Head from 'next/head';

// axios
import axios from 'axios';

// UUID
import { v4 as uuidv4 } from 'uuid';

// Components
import ParkInfoSection from '../../components/ParkInfoSection';
import ParkHours from '../../components/ParkSections/ParkHours';
import Activities from '../../components/ParkSections/Activities';
import Map from '../../components/Map';
import Contact from '../../components/ParkSections/Contact';
import Photos from '../../components/ParkSections/Photos';

// Custom Types
import { IParkDataResponse, IParkData } from '../../customTypes/parks';

interface IProps {
  parkData: IParkData;
  googleMapsKey: string;
}

const ParkPage: NextPage<IProps> = ({ parkData, googleMapsKey }) => {
  return (
    <>
      <Head>
        <title>Outdoor Adventures</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container px-4 pt-6 mx-auto text-gray-400">
        <h1 className="text-center mb-4 text-4xl text-white">{parkData.fullName}</h1>

        <ParkInfoSection title="Description">
          <p>{parkData.description}</p>
        </ParkInfoSection>

        <ParkInfoSection title="Entrance Fees">
          <ul>
            {parkData.entranceFees.map((fee) => {
              return (
                <li key={uuidv4()} className="mb-4">
                  <h4 className="text-white">
                    {fee.title} <span className="italic">${fee.cost}</span>
                  </h4>
                  <p>{fee.description}</p>
                </li>
              );
            })}
          </ul>
        </ParkInfoSection>

        <ParkHours operatingHours={parkData.operatingHours} />

        <Activities activities={parkData.activities} />

        <ParkInfoSection title="Location">
          <Map googleMapsKey={googleMapsKey} lat={parseFloat(parkData.latitude)} lng={parseFloat(parkData.longitude)} />
        </ParkInfoSection>

        <Contact contacts={parkData.contacts} url={parkData.url} />
        <Photos images={parkData.images} />
      </main>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const parkCode = context.query.parkcode;

  if (typeof parkCode !== 'string') {
    return;
  }

  try {
    const { data } = await axios.get<IParkDataResponse>(
      `https://developer.nps.gov/api/v1/parks?parkCode=${parkCode}&api_key=${process.env.NATIONAL_PARKS_APIKEY}`,
    );

    return {
      props: {
        parkData: data.data[0],
        googleMapsKey: process.env.GOOGLE_MAPS_APIKEY,
      }, // will be passed to the page component as props
    };
  } catch (err) {
    return {
      props: {
        parkData: null,
      }, // will be passed to the page component as props
    };
  }
}

// # const { data } = await axios.get(
//   #   `https://developer.nps.gov/api/v1/parks?parkCode=${parkCode}&api_key=${process.env.NATIONAL_PARKS_APIKEY}`,
//   # );
export default ParkPage;
