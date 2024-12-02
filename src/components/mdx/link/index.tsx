import Link from "next/link";
import { FC, HTMLProps } from "react";

interface Props extends HTMLProps<HTMLAnchorElement> {
  prefetch?: boolean;
}

const MdxLink: FC<Props> = ({ children, className, href = "#", ...props }) => {
  const Tag = href.startsWith("http") ? "a" : Link;
  const linkProps = href.startsWith("http")
    ? { target: "_blank", rel: "noreferrer", href }
    : { href };

  return (
    <Tag
      className={["scroll-mt-24", className].filter(Boolean).join(" ")}
      {...linkProps}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default MdxLink;
