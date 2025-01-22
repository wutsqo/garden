import { WORKS } from "@components/home/data";
import { ChartArea, LucideProps, RocketIcon } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
export const PROJECTS = WORKS;

type IconProps = Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>;
export const FEATURED_PROJECTS = [
  {
    title: "IFML to React UI Code Generator",
    description:
      "React code generator for the PRICES-IDE ecosystem, a framework based on Software Product Line Engineering paradigm.",
    subprojects: [
      {
        title: "Performance Optimization",
        description: "Performance optimization of the code generator.",
        icon: (props: IconProps) => <RocketIcon {...props} />,
        bgColor: "#1956B4",
      },
      {
        title: "List to Chart Transformation",
        description: "Transformation of list data to a chart.",
        icon: (props: IconProps) => <ChartArea {...props} />,
        bgColor: "#1956B4",
      },
    ],
  },
  {
    title: "Satu Abad Pramoedya Ananta Toer",
    description:
      "Digital exhibition of the life and works of Pramoedya Ananta Toer to commemorate the centenary of his birth.",
    subprojects: [
      {
        title: "Bibliography",
        description: "A collection of Pramoedya Ananta Toer's works.",
        icon: (props: IconProps) => <RocketIcon {...props} />,
        bgColor: "#1956B4",
      },
      {
        title: "Timeline",
        description: "A timeline of Pramoedya Ananta Toer's life.",
        icon: (props: IconProps) => <RocketIcon {...props} />,
        bgColor: "#1956B4",
      },
      {
        title: "News & Articles",
        description: "A collection of news and articles about Pramoedya Ananta Toer.",
        icon: (props: IconProps) => <RocketIcon {...props} />,
        bgColor: "#1956B4",
      },
      {
        title: "Archives",
        description: "A collection of Pramoedya Ananta Toer's archives.",
        icon: (props: IconProps) => <RocketIcon {...props} />,
        bgColor: "#1956B4",
      },
      {
        title: "#SeAbadPram around The Internet",
        description: "A collection of community tweets about Pramoedya Ananta Toer.",
        icon: (props: IconProps) => <RocketIcon {...props} />,
        bgColor: "#1956B4",
      },
    ],
  },
];
