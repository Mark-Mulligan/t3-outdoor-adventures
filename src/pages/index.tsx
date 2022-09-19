// React
import { useState, useEffect } from 'react';

// Next
import type { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';

// Prisma
import { prisma } from '../server/db/client';

// React Select
import { MultiValue } from 'react-select';

// Components
import Table from '../components/Table';
import Pagination from '../components/Pagination';
import MultiSelect from '../components/MultiSelect';

// Utils
import { stateList, designationList } from '../utils/util';
import { createQueryObject, removeQueryKey } from '../utils/routing';

interface ParkData {
  id: string;
  fullname: string;
  parkcode: string;
  states: string;
  designation: string;
}

interface IProps {
  parks: ParkData[];
}

interface TableColumn<T> {
  field: keyof T;
  headerName: string;
}

interface SelectOption {
  value: string;
  label: string;
}

const columns: TableColumn<ParkData>[] = [
  { field: 'fullname', headerName: 'Park Name' },
  { field: 'parkcode', headerName: 'Park Code' },
  { field: 'states', headerName: 'State(s)' },
  { field: 'designation', headerName: 'Designation' },
];

const Home: NextPage<IProps> = ({ parks }) => {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(47);
  const [totalResults, setTotalResults] = useState(463);
  const [parkResults, setParkResults] = useState<ParkData[]>([]);
  const [selectedStates, setSelectedStates] = useState<MultiValue<SelectOption> | null>(null);
  const [selectedDesignations, setSelectedDesignations] = useState<MultiValue<SelectOption> | null>(null);

  const handleStatesChange = (newValue: MultiValue<SelectOption>) => {
    setSelectedStates(newValue);

    const stateValues = newValue.map((option) => {
      return option.value;
    });
    const stateValuesStr = stateValues.join(',');

    if (!stateValuesStr) {
      router.push({ pathname: '/', query: removeQueryKey(router, 'states') }, undefined, {
        shallow: true,
      });
      return;
    }

    router.push({ pathname: '/', query: createQueryObject(router, 'states', stateValuesStr) }, undefined, {
      shallow: true,
    });
  };

  const handleDesignationChange = (newValue: MultiValue<SelectOption>) => {
    setSelectedDesignations(newValue);

    const desValues = newValue.map((option) => {
      return option.value;
    });
    const desValuesStr = desValues.join(',');
    router.push({ pathname: '/', query: createQueryObject(router, 'designation', desValuesStr) }, undefined, {
      shallow: true,
    });
  };

  useEffect(() => {
    const queryPage = router.query.page || '';
    const queryLimit = router.query.limit || '';
    const queryStates = router.query.states || '';

    if (queryPage) {
      setPage(Number(queryPage));
    }

    if (queryLimit) {
      setLimit(Number(queryLimit));
    }

    if (queryStates) {
      console.log('queryStates', queryStates);
    }
  }, [router.query]);

  useEffect(() => {
    const offset = (page - 1) * limit;
    const endIndex = page * limit;
    const results = parks.slice(offset, endIndex);
    setParkResults(results);
    setTotalResults(parks.length);
    setTotalPages(Math.ceil(parks.length / limit));
  }, [page, limit, parks]);

  return (
    <>
      <Head>
        <title>Outdoor Adventures</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto">
        <div className="flex flex-wrap -mx-3 pt-5 pb-5">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="grid-city">
              Park Name
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="grid-city"
              type="text"
              placeholder="Albuquerque"
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="grid-state">
              State
            </label>

            <MultiSelect id="statesSelect" value={selectedStates} options={stateList} onChange={handleStatesChange} />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="grid-zip">
              Designation
            </label>
            <MultiSelect
              id="designationSelect"
              value={selectedDesignations}
              options={designationList}
              onChange={handleDesignationChange}
            />
          </div>
        </div>

        <Table<ParkData> rows={parkResults} columns={columns} />
        <Pagination page={page} limit={limit} totalPages={totalPages} totalResults={totalResults} />
      </main>
    </>
  );
};

export default Home;

export async function getStaticProps(context: NextPageContext) {
  try {
    const parks = await prisma.nationalParksData.findMany();

    return {
      props: {
        parks,
      }, // will be passed to the page component as props
    };
  } catch (err) {
    return {
      props: {
        parks: [],
      }, // will be passed to the page component as props
    };
  }
}
