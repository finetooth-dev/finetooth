export type ProjectType = {
    slug: string;
    client: string;
    year: string;
    category: string;
    role: string;
    col1: string;
    col2: string;
    bgImgURL: string;
    link: string;
    imageList: string[];
};

const projects: Array<ProjectType> = [
    {
        slug: "daniel-laner",
        client: "daniellaner.com",
        year: "2024",
        category: "audio engineering",
        role: "web design + development",
        col1: "Daniel Laner is an Oakland-born, LA-based audio engineer specializing in pop music.  \nTo explore his past work, prospective clients can hover over this blurry mural of cover art to preview short clips of songs.  \nMusic should be able to speak for itself; with this site’s redesign, it’s much easier to facilitate that moment.",
        col2: "Column 2 text",
        bgImgURL: "/images/gif33fps.gif",
        imageList: [],
        link: "https://daniellaner.com/",
    },
    {
        slug: "stem",
        client: "stem",
        year: "2023",
        category: "music distribution",
        role: "web design + development",
        col1: "“Widely-known for its comprehensive distribution offering, including artist-development services and data-driven insights, Stem arms artists with the tools & resources needed to flourish creatively & commercially.” \n\n Featured roster \n\n 001 Mk.gee \n 002 Brent Faiyaz \n 003 Veeze \n 004 Charlotte Lawrence\n 005 Fisher \n006 Yeek \n007 Justine Skye\n 008 Sabrina Claudio\n 009 UMI\n 010 Alexander 23",
        col2: "★ awwwards honorable mention",
        bgImgURL: "/images/stem-card.png",
        imageList: ["/images/stem2.gif", "/images/stem1.gif"],
        link: "https://stem.is/",
    },
    {
        slug: "g-jones",
        client: "g jones",
        year: "2023",
        category: "music production",
        role: "web design + development",
        col1: "Single release website made for the album Paths by electronic artist G Jones. This website implemented the parametric grid-based visual system that pervaded all surfaces relevant to the new album and associated US tour onto the web. The adaptive UI approach taken ensured a perfect viewing experience on any device or window.",
        col2: "",
        bgImgURL: "/images/paths.png",
        imageList: ["/images/paths.gif"],
        link: "",
    },
    {
        slug: "ruby-red",
        client: "ruby red",
        year: "2023",
        category: "music",
        role: "web design + development",
        col1: "Using live camera feed, rubyred.world randomly populates your 3d space with music, merch, and maybe even unreleased music –– no two “galleries” are the same.",
        col2: "",
        bgImgURL: "/images/disc.png",
        imageList: ["/images/mix2.png"],
        link: "",
    },
    {
        slug: "21-savage",
        client: "21 savage",
        year: "2024",
        category: "music",
        role: "generative visuals",
        col1: "Single release website made for the album Paths by electronic artist G Jones. This website implemented the parametric grid-based visual system that pervaded all surfaces relevant to the new album and associated US tour onto the web. The adaptive UI approach taken ensured a perfect viewing experience on any device or window.",
        col2: "",
        bgImgURL: "/images/21-savage.webp",
        imageList: [],
        link: "",
    },
];

export default projects;
