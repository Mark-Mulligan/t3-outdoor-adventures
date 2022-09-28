// React
import { FC, ReactNode } from "react";

interface IProps {
  children: ReactNode;
  title: string;
}

const ParkSection: FC<IProps> = ({ title, children }) => {
  return (
    <section className="mb-8">
      <h2 className="text-3xl text-white">{title}</h2>
      <hr className="my-5 h-px border-0 bg-gray-700" />
      {children}
    </section>
  );
};

export default ParkSection;
