export type ProjectType = {
  slug: string;
  client: string;
  year: string;
  category: string;
  role: string;
  col1: string;
  col2: string;
  bgImgURL: string;
  imageList: string[];
};

const projects: Array<ProjectType> = [
  {
    slug: "danny-laner",
    client: "danny laner",
    year: "2024",
    category: "audio engineering",
    role: "web design + development",
    col1: "Daniel Laner is an Oakland-born, LA-based audio engineer specializing in pop music.  \nTo explore his past work, prospective clients can hover over this blurry mural of cover art to preview short clips of songs.  \nMusic should be able to speak for itself; with this site’s redesign, it’s much easier to facilitate that moment.",
    col2: "Column 2 text",
    bgImgURL: "/images/gif33fps.gif",
    imageList: [],
  },
  {
    slug: "stem",
    client: "stem",
    year: "2023",
    category: "music distribution",
    role: "web design + development",
    col1: "“Widely-known for its comprehensive distribution offering, including artist-development services and data-driven insights, Stem arms artists with the tools & resources needed to flourish creatively & commercially.” \n\n Featured roster \n\n 001 Mk.gee \n 002 Brent Faiyaz \n 003 Veeze \n 004 Charlotte Lawrenc\n 005 Fisher \n006 Yeek \n007 Justine Skye\n 008 Sabrina Claudio\n 009 UMI\n 010 Alexander 23",
    col2: "★ awwwards honorable mention",
    bgImgURL: "/images/stem-card.png",
    imageList: [
      "/images/stem-card.png",
      "/images/stem1.gif",
      "/images/stem2.gif",
    ],
  },
  {
    slug: "g-jones",
    client: "g jones",
    year: "2023",
    category: "music production",
    role: "web design + development",
    col1: "g jones website",
    col2: "",
    bgImgURL: "/images/stem-card.png",
    imageList: [],
  },
];

export default projects;