
//Available social links by default
const defaultLinks = {
    instagram: null,
    linkedin: null,
    mastodon: null,
    bluesky: null,
    twitter: null,
    youtube: null,
    git: null,
};

//Add your info here, follow the existing structure :)
const volunteers = {
    infrastructure: [
        {
            name: "Isadora Dos Santos",
            image: "/images/volunteers/codingisads.jpeg",
            links: {
                linkedin: "https://www.linkedin.com/in/isadora-micaela-dossantos/",
                mastodon: "https://www.instagram.com/isadorads_/",
                git: "https://github.com/codingisads",

            },
        },
        {
            name: "Ege Akman",
            image: "/logo.svg",
            links: {
                instagram: "https://www.instagram.com/isadorads_/",
            },
        },
        {
            name: "Tilda Udufo",
            image: "/logo.svg",
            links: {
                instagram: "https://www.instagram.com/isadorads_/",
            },
        },
        {
            name: "Marco Richetta ",
            image: "/logo.svg",
            links: {
                instagram: "https://www.instagram.com/isadorads_/",
            },
        },
    ],
    program: [
        
        {
            name: "Tilda Udufo",
            image: "/logo.svg",
            links: {
                instagram: "https://www.instagram.com/isadorads_/",
            },
        },
        {
            name: "Isadora Dos Santos",
            image: "/images/volunteers/codingisads.jpeg",
            links: {
                linkedin: "https://www.linkedin.com/in/isadora-micaela-dossantos/",
                mastodon: "https://www.instagram.com/isadorads_/",
                git: "https://github.com/codingisads",
            },
        },
    ],
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

//shuffle array
function shuffleArray(array) {
  const arr = [...array]; // clonamos para no mutar el original
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
