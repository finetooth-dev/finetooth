export type ProjectType = {
  slug: string;
  client: string;
  year: string;
  category: string;
  role: string;
  col1: string;
  col2: string;
  bgImgURL: string;
  chipImgURL: string;
  link: string;
  imageList: string[];
  textTheme: string;
};

const projects: Array<ProjectType> = [
  {
    slug: 'daniel-laner',
    client: 'daniellaner.com',
    year: '2024',
    category: 'audio engineering',
    role: 'web design + development',
    col1: 'Daniel Laner is an Oakland-born, LA-based audio engineer specializing in pop music.  \n\nTo explore his past work, prospective clients can hover over this blurry mural of cover art to preview short clips of songs.  \n\nMusic should be able to speak for itself; with this site’s redesign, it’s much easier to facilitate that moment.',
    col2: '',
    bgImgURL: '/images/gif33fps.gif',
    chipImgURL: '',
    imageList: ['/images/gif33fps.gif'],
    link: 'https://daniellaner.com/',
    textTheme: 'light',
  },
  {
    slug: 'seiji-oda',
    client: 'seiji oda',
    year: '2024',
    category: 'generative music',
    role: 'ableton live development',
    col1: "this script translates corporeal movements (in this case, the speed and direction of hand landmarks) into midi signals. \n\nThese signals can then be mapped to instruments in Ableton Live, allowing users to create / modify music + soundscapes using movement. \n\nHere, a video of seiji oda performing a tai chi routine is used as input, resulting in an ambient soundscape that 'responds' to his movements.",
    col2: 'stack:\n\n- mediapipe\n- python \n- mido\n- ableton live',
    bgImgURL: '/images/seiji_trimmed.gif',
    chipImgURL: '/images/seiji_trimmed.gif',
    imageList: ['/images/seiji_trimmed.gif', '/images/seiji-demo.png'],
    link: '',
    textTheme: 'light',
  },
  {
    slug: 'stem',
    client: 'stem',
    year: '2023',
    category: 'music distribution',
    role: 'web design + development',
    col1: '“Widely-known for its comprehensive distribution offering, including artist-development services and data-driven insights, Stem arms artists with the tools & resources needed to flourish creatively & commercially.” \n\n Featured clients \n\n 001 Mk.gee \n 002 Brent Faiyaz \n 003 Veeze \n 004 Charlotte Lawrence\n 005 Fisher \n006 Yeek \n007 Justine Skye\n 008 Sabrina Claudio\n 009 UMI\n 010 Alexander 23',
    col2: '★ awwwards honorable mention',
    bgImgURL: '/images/stem-card.png',
    chipImgURL: '',
    imageList: ['/images/stem2.gif', '/images/stem1.gif'],
    link: 'https://stem.is/',
    textTheme: 'light',
  },
  {
    slug: 'g-jones',
    client: 'g jones',
    year: '2023',
    category: 'artist site',
    role: 'web design + development',
    col1: "Single release website made for the album Paths by electronic artist G Jones.\n\n This website implemented the parametric grid-based visual system that pervaded all surfaces relevant to the new album and associated US tour onto the web; users could adjust sonic parameters that in turn modified the site's visuals",
    col2: '',
    bgImgURL: '/images/paths.gif',
    chipImgURL: '',
    imageList: ['/images/paths.png'],
    link: 'archived',
    textTheme: 'light',
  },
  {
    slug: 'ruby-red',
    client: 'ruby red',
    year: '2023',
    category: 'artist site',
    role: 'web design + development',
    col1: 'Using live camera feed, rubyred.world randomly populates your 3d space with music, merch, and maybe even unreleased music –– no two “galleries” are the same.\n\nthe context in which listeners discover new music is often overlooked. by using augmented reality to contextualize ruby red within new spaces, that moment of discovery becomes enhanced and personalized.',
    col2: '',
    bgImgURL: '/images/rr_mob.gif',
    chipImgURL: '/images/disc.png',
    imageList: ['/images/petri_dish.png'],
    link: '',
    textTheme: 'dark',
  },
  {
    slug: '21-savage',
    client: '21 savage',
    year: '2024',
    category: 'american dream tour',
    role: 'image gen',
    col1: "selection of live visuals for 21 savage's 'american dream' tour",
    col2: '',
    bgImgURL: '/images/21-savage.webp',
    chipImgURL: '',
    imageList: [
      '/images/21-savage.webp',
      '/images/21-savage-3.webp',
      '/images/21-savage-4.webp',
    ],
    link: '',
    textTheme: 'light',
  },
];

export default projects;
