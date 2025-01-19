import { FC, Fragment } from "react";
import Glowing from "@components/glowing";
import { mergeClassname as cn } from "@utils/merge-classname";
import { PageTitleProps } from "./index.type";

const PageTitle: FC<PageTitleProps> = ({ title, subtitle, xl, notGlowing, titleProps, subtitleProps }) => {
  const H1Wrapper = notGlowing ? Fragment : Glowing;
  const tProps = {
    ...titleProps,
    className: cn("pb-1", titleProps?.className, xl ? "text-4xl sm:text-5xl" : "text-4xl"),
  };
  const sProps = {
    ...subtitleProps,
    className: cn("text-xl mt-2", subtitleProps?.className),
  };

  return (
    <Fragment>
      <H1Wrapper>
        <h1 {...tProps}>{title}</h1>
      </H1Wrapper>
      {subtitle ? <div {...sProps}>{subtitle}</div> : null}
    </Fragment>
  );
};

export default PageTitle;
export { type PageTitleProps };
