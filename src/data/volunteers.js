
//Available social links by default
const defaultLinks = {
    instagram: null,
    linkedin: null,
    mastodon: null,
    bluesky: null,
    twitter: null,
    youtube: null,
    git: null,
    website: null,
};

//Add your info here, follow the existing structure :)
const volunteers = {
    infrastructure: [
        {
            name: "Isadora Dos Santos",
            image: "/images/volunteers/codingisads.jpeg",
            links: {
                linkedin: "https://www.linkedin.com/in/isadora-micaela-dossantos/",
                git: "https://github.com/codingisads",

            },
        },
        {
            name: "Tilda Udufo",
            image: "/images/volunteers/tilda_udufo.jpg",
            links: {
                linkedin: "https://www.linkedin.com/in/mathilda-udufo",
                git: "https://github.com/TildaDares"
            },
        },
        {
            name: "Marco Richetta",
            image: "/images/volunteers/marco_richetta.jpg",
            links: {
                linkedin: "https://www.linkedin.com/in/marco-richetta/",
                mastodon: "https://mastodon.social/@mrichetta"
            },
        },
        {
            name: "Ege Akman",
            image: "/images/volunteers/egeakman.png",
            links: {
                linkedin: "https://linkedin.com/in/egeakman",
                mastodon: "https://mastodon.social/@egeakman",
                git: "https://github.com/egeakman",
                twitter: "https://twitter.com/egeakmn",
            },
        },
    ],
    program: [
         {
            name: "Nathan Bransby",
            image: "/images/volunteers/nathan_bransby.png",
            links: {
                linkedin: "https://www.linkedin.com/in/nathan-bransby",
                git: "https://github.com/Nathan-Bransby-NMT",
                website: "https://www.nlb-software.dev",
            },
        },
        {
            name: "Amethyst Reese",
            image: "/images/volunteers/amethyst.png",
            links: {
                git: "https://github.com/amyreese",
                mastodon: "https://toots.n7.gg/@amethyst",
                website: "https://amethyst.cat",
            },
        },
    ],
    code_of_conduct: [
        {
            name: "Nathan Bransby",
            image: "/images/volunteers/nathan_bransby.png",
            links: {
                linkedin: "https://www.linkedin.com/in/nathan-bransby",
                git: "https://github.com/Nathan-Bransby-NMT",
                website: "https://www.nlb-software.dev",
            },
        },
    ],
    communications: [],
    design_media: [],
};


//adds the default socials
const volunteersWithDefaults = Object.fromEntries(
  Object.entries(volunteers).map(([group, arr]) => [
    group,
    arr.map(v => ({
      ...v,
      links: { ...defaultLinks, ...v.links },
    }))
  ])
);

//shuffle array function
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// shuffled array
const volunteersShuffled = Object.fromEntries(
  Object.entries(volunteersWithDefaults).map(([group, arr]) => [
    group,
    shuffleArray(arr),
  ])
);



export default volunteersShuffled;
