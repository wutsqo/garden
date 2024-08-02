import { FC } from "react";
import s from "./index.module.css";
import { PageTitleProps } from "./index.type";

const PageTitle: FC<PageTitleProps> = ({ title, subtitle }) => {
  return (
    <>
      <div className={s.title}>{title}</div>
      {subtitle ? <div className={s.subtitle}>{subtitle}</div> : null}
    </>
  );
};

export default PageTitle;
