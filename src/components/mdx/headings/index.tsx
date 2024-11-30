import { FC, HTMLProps } from "react";
import slugify from "@utils/slugify";

interface HProps extends HTMLProps<HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4 | 5 | 6; // Specify heading levels
}

const Heading: FC<HProps> = ({ level, children, className, ...props }) => {
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  const slug = slugify(children?.toString() ?? "");

  return (
    <Tag
      className={["scroll-mt-24", className].filter(Boolean).join(" ")}
      id={slug}
      {...props}
    >
      <a href={`#${slug}`} className="no-underline hover:underline">
        {children}
      </a>
    </Tag>
  );
};

const H1: FC<Omit<HProps, "level">> = (props) => (
  <Heading level={1} {...props} />
);
const H2: FC<Omit<HProps, "level">> = (props) => (
  <Heading level={2} {...props} />
);
const H3: FC<Omit<HProps, "level">> = (props) => (
  <Heading level={3} {...props} />
);
const H4: FC<Omit<HProps, "level">> = (props) => (
  <Heading level={4} {...props} />
);
const H5: FC<Omit<HProps, "level">> = (props) => (
  <Heading level={5} {...props} />
);
const H6: FC<Omit<HProps, "level">> = (props) => (
  <Heading level={6} {...props} />
);

export { H1, H2, H3, H4, H5, H6 };
