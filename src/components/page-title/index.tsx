import { FC } from "react";
import { PageTitleProps } from "./index.type";
import Glowing from "@components/glowing";

const PageTitle: FC<PageTitleProps> = ({ title, subtitle, xl }) => {
  return (
    <div className="">
      <Glowing>
        <h1 className={`pb-1 ${xl ? "text-4xl sm:text-5xl" : "text-4xl"}`}>{title}</h1>
      </Glowing>
      {subtitle ? <div className="text-xl mt-2">{subtitle}</div> : null}
    </div>
  );
};

export default PageTitle;
export { type PageTitleProps };
