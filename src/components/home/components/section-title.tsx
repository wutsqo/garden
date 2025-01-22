import { FC } from "react";

interface Props {
  number: string;
  title: string;
}

const SectionTitle: FC<Props> = ({ number, title }) => {
  return (
    <div className="flex items-center justify-start gap-6 font-medium text-black">
      <div className="shadow-brutalist flex h-12 w-12 items-center justify-center rounded border border-black bg-white text-lg">
        {number}
      </div>
      <div className="font-sans text-2xl">{title}</div>
    </div>
  );
};

export default SectionTitle;
