// React
import React, { useState, useEffect, Dispatch, SetStateAction, useMemo } from "react";

// Next
import type { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import Head from "next/head";

// Prisma
import { prisma } from "../server/db/client";

// Lodash
import debounce from "lodash/debounce";

// React Select
import { MultiValue } from "react-select";

// Components
import Table from "../components/Table";
import Pagination from "../components/Pagination";
import MultiSelect from "../components/MultiSelect";

// Utils
import { stateList, designationList } from "../utils/util";
import { createQueryObject, removeQueryKey } from "../utils/routing";

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
  { field: "fullname", headerName: "Park Name" },
  { field: "parkcode", headerName: "Park Code" },
  { field: "states", headerName: "State(s)" },
  { field: "designation", headerName: "Designation" },
];

const Home: NextPage<IProps> = ({ parks }) => {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(47);
  const [totalResults, setTotalResults] = useState(463);
  const [parkResults, setParkResults] = useState<ParkData[]>([]);
  const [parkName, setParkName] = useState("");
  const [parkNameQuery, setParkNameQuery] = useState("");
  const [selectedStates, setSelectedStates] = useState<MultiValue<SelectOption> | null>(null);
  const [selectedDesignations, setSelectedDesignations] = useState<MultiValue<SelectOption> | null>(null);

  const debouncedSearch = useMemo(
    () =>
      debounce((val: string) => {
        if (!val) {
          router.push({ pathname: "/", query: removeQueryKey(router, "q") }, undefined, { shallow: true });
          return;
        }

        router.push({ pathname: "/", query: createQueryObject(router, "q", val) }, undefined, {
          shallow: true,
        });
      }, 750),
    [router]
  );

  const handleParkNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParkName(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleSelectChange = (newValue: MultiValue<SelectOption>, queryKey: string) => {
    const values = newValue.map((option) => {
      return option.value;
    });
    const valueAsStr = values.join(",");

    if (!valueAsStr) {
      router.push({ pathname: "/", query: removeQueryKey(router, queryKey) }, undefined, { shallow: true });
      return;
    }

    router.push({ pathname: "/", query: createQueryObject(router, queryKey, valueAsStr) }, undefined, {
      shallow: true,
    });
  };

  const getSelectValuesFromQuery = (
    queryString: string,
    selectOptions: SelectOption[],
    setSelectedOptions: Dispatch<SetStateAction<MultiValue<SelectOption> | null>>
  ) => {
    const values = queryString.split(",");
    const result: SelectOption[] = [];

    selectOptions.forEach((option) => {
      if (option && values.includes(option.value)) {
        result.push(option);
      }
    });

    setSelectedOptions(result);
  };

  useEffect(() => {
    const queryPage = router.query.page || "";
    const queryLimit = router.query.limit || "";
    const queryParkName = router.query.q || "";
    const queryStates = router.query.states || "";
    const queryDesignations = router.query.designation || "";

    if (queryPage) {
      setPage(Number(queryPage));
    }

    if (queryLimit) {
      setLimit(Number(queryLimit));
    }

    if (queryParkName && typeof queryParkName === "string") {
      setParkNameQuery(queryParkName);
      setParkName(queryParkName);
    } else {
      setParkNameQuery("");
      setParkName("");
    }

    if (queryStates && typeof queryStates === "string") {
      getSelectValuesFromQuery(queryStates, stateList, setSelectedStates);
    } else {
      setSelectedStates(null);
    }

    if (queryDesignations && typeof queryDesignations === "string") {
      getSelectValuesFromQuery(queryDesignations, designationList, setSelectedDesignations);
    } else {
      setSelectedDesignations(null);
    }
  }, [router.query]);

  useEffect(() => {
    const offset = (page - 1) * limit;
    const endIndex = page * limit;
    let filteredParks = [...parks];

    if (selectedStates && selectedStates.length > 0) {
      let selectedStatesValues = selectedStates.map((state) => state.value);

      filteredParks = filteredParks.filter((park) => {
        const parkStatesArr = park.states.toLowerCase().split(",");

        for (let i = 0; i < parkStatesArr.length; i++) {
          let stateValue = parkStatesArr[i];

          if (stateValue && selectedStatesValues.includes(stateValue)) {
            return true;
          }
        }

        return false;
      });
    }

    if (selectedDesignations && selectedDesignations.length > 0) {
      let selectedDesValues = selectedDesignations.map((des) => des.value);

      filteredParks = filteredParks.filter((park) => {
        const parkDesignation = park.designation.toLowerCase();
        return selectedDesValues.includes(parkDesignation);
      });
    }

    if (parkNameQuery) {
      filteredParks = filteredParks.filter((park) => {
        return park.fullname.toLowerCase().includes(parkNameQuery.toLowerCase());
      });
    }

    console.log(filteredParks);

    setParkResults(filteredParks.slice(offset, endIndex));
    setTotalResults(filteredParks.length);
    setTotalPages(Math.ceil(filteredParks.length / limit));
  }, [page, limit, parks, selectedStates, parkNameQuery]);

  return (
    <>
      <Head>
        <title>Outdoor Adventures</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-3 pt-5 pb-5">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block mb-2 text-sm font-medium text-gray-300" htmlFor="grid-city">
              Park Name
            </label>
            <input
              style={{ outline: "none" }}
              value={parkName}
              onChange={handleParkNameChange}
              className="bg-gray-700 border border-gray-600 text-sm rounded-lg block w-full p-2.5 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              type="text"
              placeholder="Search Park Name"
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block mb-2 text-sm font-medium text-gray-300" htmlFor="grid-state">
              State
            </label>

            <MultiSelect
              id="statesSelect"
              value={selectedStates}
              options={stateList}
              onChange={(newValue: MultiValue<SelectOption>) => handleSelectChange(newValue, "states")}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block mb-2 text-sm font-medium text-gray-300" htmlFor="grid-zip">
              Designation
            </label>
            <MultiSelect
              id="designationSelect"
              value={selectedDesignations}
              options={designationList}
              onChange={(newValue: MultiValue<SelectOption>) => handleSelectChange(newValue, "designation")}
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

    // Adding a space to the listed states so they fit better in the table
    const formattedParks = parks.map((park) => {
      let statesValueFormatted = park.states.split(",").join(", ");
      return { ...park, states: statesValueFormatted };
    });

    return {
      props: {
        parks: formattedParks,
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
