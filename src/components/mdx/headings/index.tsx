import { FC, HTMLProps } from "react";
import slugify from "@utils/slugify";

interface HProps extends HTMLProps<HTMLHeadingElement> {}

const H1: FC<HProps> = ({ children, ...props }) => (
  <h1 className="scroll-mt-24" id={slugify(children as string)}>
    {children}
  </h1>
);

const H2: FC<HProps> = ({ children, ...props }) => (
  <h2 className="scroll-mt-24" id={slugify(children as string)}>
    {children}
  </h2>
);

const H3: FC<HProps> = ({ children, ...props }) => (
  <h3 className="scroll-mt-24" id={slugify(children as string)}>
    {children}
  </h3>
);

const H4: FC<HProps> = ({ children, ...props }) => (
  <h4 className="scroll-mt-24" id={slugify(children as string)}>
    {children}
  </h4>
);

const H5: FC<HProps> = ({ children, ...props }) => (
  <h5 className="scroll-mt-24" id={slugify(children as string)}>
    {children}
  </h5>
);

const H6: FC<HProps> = ({ children, ...props }) => (
  <h6 className="scroll-mt-24" id={slugify(children as string)}>
    {children}
  </h6>
);

export { H1, H2, H3, H4, H5, H6 };
