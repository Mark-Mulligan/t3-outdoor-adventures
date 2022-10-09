// React
import { FC } from 'react';

// Next
import { NextRouter } from 'next/router';

// Components
import Arrow from './Arrow';

interface IProps {
  router: NextRouter;
  columnHeader: string;
}

const SortArrow: FC<IProps> = ({ router, columnHeader }) => {
  const sortStr = router.query.sort;

  if (sortStr && sortStr.includes(columnHeader)) {
    if (sortStr.includes('asc')) {
      return <Arrow direction="up" />;
    }

    return <Arrow direction="down" />;
  }

  return null;
};

export default SortArrow;
