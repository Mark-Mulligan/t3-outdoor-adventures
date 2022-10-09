// React
import { FC } from 'react';

interface IProps {
  direction: 'up' | 'down';
}

const upArrow = 'M5 10l7-7m0 0l7 7m-7-7v18';
const downArrow = 'M19 14l-7 7m0 0l-7-7m7 7V3';

const Arrow: FC<IProps> = ({ direction }) => {
  const drawArrow = () => {
    if (direction === 'up') return upArrow;
    return downArrow;
  };

  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={drawArrow()} />
    </svg>
  );
};

export default Arrow;
