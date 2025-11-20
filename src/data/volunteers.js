
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
    ],
    program: [],
    communications: [],
    design_media: [],
};


//adds de default socials
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
