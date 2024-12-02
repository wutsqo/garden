import { FC, Fragment } from "react";
import { PageTitleProps } from "./index.type";
import Glowing from "@components/glowing";

const PageTitle: FC<PageTitleProps> = ({ title, subtitle, xl, notGlowing }) => {
  const H1Wrapper = notGlowing ? Fragment : Glowing;
  return (
    <div>
      <H1Wrapper>
        <h1 className={`pb-1 ${xl ? "text-4xl sm:text-5xl" : "text-4xl"}`}>
          {title}
        </h1>
      </H1Wrapper>
      {subtitle ? <div className="text-xl mt-2">{subtitle}</div> : null}
    </div>
  );
};

export default PageTitle;
export { type PageTitleProps };
