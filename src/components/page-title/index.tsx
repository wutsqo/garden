import { FC } from "react";
import s from "./index.module.css";
import { PageTitleProps } from "./index.type";

const PageTitle: FC<PageTitleProps> = ({ title, subtitle }) => {
  return (
    <>
      <h1 className={s.title}>{title}</h1>
      {subtitle ? <div className={s.subtitle}>{subtitle}</div> : null}
    </>
  );
};

export default PageTitle;
