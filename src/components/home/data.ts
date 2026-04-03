import { Work } from "./interface";
import Dewa19 from "@images/dewa19.png";
import Purwalenta from "@images/purwalenta.png";
import Pansos from "@images/pmb.png";
import SplitEasy from "@images/spliteasy.png";
import CariBuku from "@images/caribuku.png";
import Sisidang from "@images/sisidang.png";

export const WORKS: Work[] = [
  {
    title: "Purwalenta Website",
    description: "An education platform to empower content creator talents in Indonesia.",
    label: "App/Product",
    image: Purwalenta,
    stack: ["Django", "Typescript", "Gatsby", "Figma"],
    live: "https://purwalenta.com",
  },
  {
    title: "Pansos PMB Fasilkom UI 2021",
    description: "A one-stop onboarding platform for the new students of Fasilkom UI.",
    label: "Backend/API",
    stack: ["Typescript", "SQL", "Prisma", "AWS"],
    image: Pansos,
    live: "https://pmb.cs.ui.ac.id",
  },
  {
    title: "CariBuku | Book Search Engine",
    description: "An OPAC aggregator that helps you find books across various libraries.",
    label: "App/Product",
    stack: ["NextJS"],
    live: "https://caribuku.vercel.app",
    image: CariBuku,
  },
  {
    title: "SplitEasy | An Expense Sharing App",
    description: "An app that helps you split bills and track your shared expenses.",
    label: "App/Product",
    stack: ["NextJS"],
    live: "https://split-easy.vercel.app",
    image: SplitEasy,
  },
  {
    title: "Konser 30 Tahun Dewa 19",
    description: "An official page containing information about the concert and ticket purchase.",
    label: "Landing Page",
    stack: ["Typescript", "Gatsby", "Tailwind", "Styled"],
    image: Dewa19,
    live: "https://dewa19.tiketnft.com",
  },
  {
    title: "SISIDANG Fasilkom UI",
    description: "A web app that streamlines the thesis submission and revision process.",
    label: "App/Features",
    stack: ["Django", "SQL", "Javascript"],
    live: "https://sidang.cs.ui.ac.id",
    image: Sisidang,
  },
  {
    title: "Kulinerakyat",
    description: "A place to discover and discuss Indonesia's traditional culinary.",
    label: "App/Product",
    stack: ["NodeJS", "Prisma", "Typescript"],
    live: "https://kulinerakyat.netlify.app",
  },
  {
    title: "Pacilmate Discord Bot",
    description: "A multi-purpose Discord bot specialized for the CSUI students",
    label: "Discord Bot",
    stack: ["SQL", "Java", "Git"],
    repo: "https://gitlab.com/pacilmate",
  },
  {
    title: "Capture Tweet",
    description: "A web app to capture tweets and download them as images.",
    label: "App/Product",
    stack: ["NextJS", "Tailwind", "Typescript"],
    live: "https://capture-tweet.vercel.app/",
  },
];

export const LABELS = ["App/Product", "App/Features", "Backend/API", "Landing Page", "Discord Bot"] as const;

export const EXPERTISES = [
  "Frontend Development",
  "RESTful API",
  "Database Design",
  "Data Structures & Algorithms",
  "Clean Code",
  "Design Patterns",
  "TDD",
  "Agile Methodology",
  "Digital Product Design",
  "Communication & Teamwork",
];

export const STACKS = [
  {
    name: "HTML",
    src: "/images/stack/html.svg",
  },
  {
    name: "CSS",
    src: "/images/stack/css.svg",
  },
  {
    name: "Javascript",
    src: "/images/stack/js.svg",
  },
  {
    name: "Typescript",
    src: "/images/stack/typescript.svg",
  },
  {
    name: "NodeJS",
    src: "/images/stack/node.svg",
  },
  {
    name: "Python",
    src: "/images/stack/py.svg",
  },
  {
    name: "Django",
    src: "/images/stack/django.svg",
  },
  {
    name: "SQL",
    src: "/images/stack/sql.svg",
  },
  {
    name: "Prisma",
    src: "/images/stack/prisma.svg",
  },
  {
    name: "GraphQL",
    src: "/images/stack/graphql.svg",
  },
  {
    name: "React",
    src: "/images/stack/react.svg",
  },
  {
    name: "Svelte",
    src: "/images/stack/svelte.svg",
  },
  {
    name: "Tailwind",
    src: "/images/stack/tailwind.svg",
  },
  {
    name: "NextJS",
    src: "/images/stack/next.svg",
  },
  {
    name: "Gatsby",
    src: "/images/stack/gatsby.svg",
  },
  {
    name: "Styled",
    src: "/images/stack/styled.svg",
  },
  {
    name: "Git",
    src: "/images/stack/git.svg",
  },
  {
    name: "Figma",
    src: "/images/stack/figma.svg",
  },
  {
    name: "Netlify",
    src: "/images/stack/netlify.svg",
  },
  {
    name: "AWS",
    src: "/images/stack/aws.svg",
  },
  {
    name: "Java",
    src: "/images/stack/java.svg",
  },
] as const;
