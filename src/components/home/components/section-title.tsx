import { FC } from "react";

interface Props {
  number: string;
  title: string;
}

const SectionTitle: FC<Props> = ({ number, title }) => {
  return (
    <div className="divider divider-start divider-neutral flex items-center justify-start gap-6 font-medium text-black my-16">
      <div className="shadow-brutalist flex h-10 w-10 shrink-0 items-center justify-center rounded border border-black bg-white text-base">
        {number}
      </div>
      <div className="font-sans text-2xl sm:text-3xl uppercase">{title}</div>
    </div>
  );
};

export default SectionTitle;
