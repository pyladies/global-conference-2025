
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
//Possible teams: infrastructure, program, communications, design_media, code_of_conduct
const volunteers = [
  {
            name: "Isadora Dos Santos",
            image: "/images/volunteers/codingisads.jpeg",
            links: {
                linkedin: "https://www.linkedin.com/in/isadora-micaela-dossantos/",
                git: "https://github.com/codingisads",

            },
            teams: ["infrastructure"]
        },
        {
            name: "Tilda Udufo",
            image: "/images/volunteers/tilda_udufo.jpg",
            links: {
                linkedin: "https://www.linkedin.com/in/mathilda-udufo",
                git: "https://github.com/TildaDares"
            },
            teams: ["infrastructure"]
        },
        {
            name: "Marco Richetta",
            image: "/images/volunteers/marco_richetta.jpg",
            links: {
                linkedin: "https://www.linkedin.com/in/marco-richetta/",
                mastodon: "https://mastodon.social/@mrichetta"
            },
            teams: ["infrastructure"]
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
            teams: ["infrastructure"]
        },
        {
            name: "Amethyst Reese",
            image: "/images/volunteers/amethyst.png",
            links: {
                git: "https://github.com/amyreese",
                mastodon: "https://toots.n7.gg/@amethyst",
                website: "https://amethyst.cat",
            },
            teams: ["program"]
        },
  ];


//adds the default socials
function applyDefaultLinks(grouped) {
  return Object.fromEntries(
    Object.entries(grouped).map(([team, arr]) => [
      team,
      arr.map(v => ({
        ...v,
        links: { ...defaultLinks, ...v.links }
      }))
    ])
  );
}

function groupByTeams(list) {
  const result = {};

  list.forEach(v => {
    v.teams.forEach(team => {
      if (!result[team]) 
        result[team] = [];

      result[team].push(v);
    });
  });

  return result;
}

//shuffle array function
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function shuffleGroups(grouped) {
  return Object.fromEntries(
    Object.entries(grouped).map(([team, arr]) => [
      team,
      shuffleArray(arr)
    ])
  );
}

// shuffled array


const grouped = groupByTeams(volunteers);
const withDefaults = applyDefaultLinks(grouped);
const volunteersFinal = shuffleGroups(withDefaults);

export default volunteersFinal;