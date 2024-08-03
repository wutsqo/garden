import { Work } from "./interface";
import Dewa19 from "@images/dewa19.png";
import Purwalenta from "@images/purwalenta.png";
import Pansos from "@images/pmb.png";

export const WORKS: Work[] = [
  {
    title: "Konser 30 Tahun Dewa 19",
    description:
      "An official page containing information about the concert and ticket purchase.",
    label: "Landing Page",
    stack: ["Typescript", "Gatsby", "Tailwind", "Styled"],
    image: Dewa19,
    live: "https://dewa19.tiketnft.com",
  },
  {
    title: "Purwalenta Website",
    description:
      "An education platform to empower content creator talents in Indonesia.",
    label: "App/Product",
    image: Purwalenta,
    stack: ["Django", "Typescript", "Gatsby", "Figma"],
    live: "https://purwalenta.com",
  },
  {
    title: "Pansos PMB Fasilkom UI 2021",
    description:
      "A one-stop onboarding platform for the new students of Fasilkom UI.",
    label: "Backend/API",
    stack: ["Typescript", "SQL", "Prisma", "AWS"],
    image: Pansos,
    live: "https://pmb.cs.ui.ac.id",
  },
  {
    title: "SISIDANG Fasilkom UI",
    description:
      "A web app that streamlines the thesis submission and revision process.",
    label: "App/Features",
    stack: ["Django", "SQL", "Javascript"],
    live: "https://sidang.cs.ui.ac.id",
  },
  {
    title: "Kulinerakyat",
    description:
      "A place to discover and discuss Indonesia's traditional culinary.",
    label: "App/Product",
    stack: ["NodeJS", "Prisma", "Typescript"],
    live: "https://kulinerakyat.netlify.app",
  },
  {
    title: "Pacilmate Discord Bot",
    description:
      "A multi-purpose Discord bot specialized for the CSUI students",
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

export const LABELS = [
  "App/Product",
  "App/Features",
  "Backend/API",
  "Landing Page",
  "Discord Bot",
] as const;

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

export const EXPERIENCES = [
  {
    id: 0,
    title: "Software Engineer Intern",
    company: "Rey.id",
    date: "Jan 2023 — Jul 2023",
    desc: [
      "Developed web clients while committing to write <strong>clean, efficient</strong>, and reviewed code.",
      "Refactored internal tools and <strong>eradicated code smells, bugs, and vulnerabilities</strong>.",
      "Utilized <strong>agile methods</strong>, incl backlog grooming, sprint planning, standups, and retrospectives.",
    ],
  },
  {
    id: 1,
    title: "Software Engineer",
    company: "Moflip.com",
    date: "Mar 2022 — Oct 2022",
    desc: [
      "Developed and <strong>refactored CMS services</strong> for TiketNFT, Bolafy and others.",
      "Developed the <strong>frontend</strong> part of various apps while adhering to <strong>React best practices</strong>.",
      "Improved <strong>load times and lighthouse score</strong> by utilizing the best rendering methods (SSR/CSR/SSG).",
    ],
  },
  // {
  // 	id: 3,
  // 	title: 'Teaching Assistant',
  // 	company: 'Fasilkom UI',
  // 	date: 'Aug 2021 — Jun 2022',
  // 	desc: [
  // 		'TA for Platform-Based Programming Course (Term 1 & 2, AY 2021/2022)',
  // 		'Assisted students in learning the course material and assignments.',
  // 		'Graded students’ group and individual assignments, and lab sessions.'
  // 	]
  // },
  {
    id: 2,
    title: "Web Developer",
    company: "Purwalenta",
    date: "Dec 2021 — Mar 2022",
    desc: [
      "Worked directly with co-founders in <strong>designing and developing</strong> web client MVP.",
      "Refactored and migrated the legacy code to make it more <strong>maintainable and scalable</strong>.",
    ],
  },
  {
    id: 3,
    title: "Web Developer",
    company: "Fasilkom UI",
    date: "Oct 2021 — Dec 2021",
    desc: [
      "Developed new features of an app that <strong>streamlines the thesis submission and revision process</strong>.",
      "Features incl: <strong>the new revision system</strong>, assessment report generator, and revamped dashboard.",
    ],
  },
  {
    id: 4,
    title: "Web Developer",
    company: "RISTEK CSUI",
    date: "Mar 2021 - Feb 2022",
    desc: [
      "Learned the <strong>best practices</strong> of web dev skills and building projects using <strong>modern web tech.</strong>",
      "<strong>Partnered with various organizations/companies</strong> to build products that's used by <strong>thousands</strong> of people.",
      "Participated in competitions. Awarded <strong>1st place</strong> in <strong>Web Dev</strong> category in <strong>Technology Euphoria 2021</strong>.",
    ],
  },
];
