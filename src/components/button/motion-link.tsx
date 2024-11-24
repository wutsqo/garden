import Link, { LinkProps } from "next/link";
import { forwardRef, ReactNode } from "react";

interface MotionLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
}

const MotionLink = forwardRef<HTMLAnchorElement, MotionLinkProps>(
  function MotionLink({ children, href, ...props }, ref) {
    return (
      <Link href={href} ref={ref} {...props}>
        {children}
      </Link>
    );
  }
);

export default MotionLink;
