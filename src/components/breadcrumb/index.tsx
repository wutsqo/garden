import Link from "next/link";
import { FC } from "react";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const BreadcrumbItem: FC<BreadcrumbItem> = ({ label, path }) => {
  const Tag = path ? Link : "span";
  return (
    <Tag href={path as string}>
      {label}
    </Tag>
  );
};

const Breadcrumb: FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex items-center space-x-2 text-sm">
        {items.map((item, index) => (
          <li key={item.path} className="flex items-center">
            {index > 0 && <span className="mx-2 text-gray-400">/</span>}
            <BreadcrumbItem {...item} />
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
