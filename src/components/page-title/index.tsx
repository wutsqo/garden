import { FC } from "react";
import s from "./index.module.css";
import { PageTitleProps, PageTitleVariant } from "./index.type";
import { mergeClassname } from "@utils/merge-classname";

const PageTitle: FC<PageTitleProps> = ({
  title,
  subtitle,
  variant = PageTitleVariant.Default,
}) => {
  return (
    <div className={mergeClassname(s[variant], s.wrapper)}>
      <h1 className={s.title}>{title}</h1>
      {subtitle ? <div className={s.subtitle}>{subtitle}</div> : null}
    </div>
  );
};

export default PageTitle;
export { PageTitleVariant, type PageTitleProps };
