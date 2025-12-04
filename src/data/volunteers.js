
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
        name: "Nathan Bransby",
        image: "/images/volunteers/nathan_bransby.png",
        links: {
            linkedin: "https://www.linkedin.com/in/nathan-bransby",
            git: "https://github.com/Nathan-Bransby-NMT",
            website: "https://www.nlb-software.dev",
        },
        teams: ["infrastructure", "code of conduct"]
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
    {
        name: "Nina Comia",
        image: "/images/volunteers/nina.JPG",
        links: {
            git: "https://github.com/ninabiik",
            linkedin: "https://www.linkedin.com/in/nina-comia"
        },
        teams: ["program"]
    },
    {
        name: "Stefanie Molin",
        image: "/images/volunteers/stefanie-molin.jpeg",
        links: {
            bluesky: "https://bsky.app/profile/stefaniemolin.com",
            git: "https://github.com/stefmolin",
            linkedin: "https://linkedin.com/in/stefanie-molin",
            twitter: "https://x.com/StefanieMolin",
            website: "https://stefaniemolin.com",
        },
        teams: ["program"]
    },
    {
        name: "Vassiliki Dalakiari",
        image: "/images/volunteers/vassilikid.jpeg",
        links: {
            linkedin: "https://www.linkedin.com/in/vadalakiari/",
            website: "https://medium.com/@vadal_",
        },
        teams: ["program"]
    },
    {
        name: "Rodrigo Girão Serrão",
        image: "/images/volunteers/rodrigogs.png",
        links: {
            linkedin: "https://linkedin.com/in/rodrigo-girão-serrão",
            website: "https://mathspp.com/",
            mastodon: "https://fosstodon.org/@mathsppblog",
            bluesky: "https://bsky.app/profile/mathspp.com",
            twitter: "https://x.com/mathsppblog",
            youtube: "https://www.youtube.com/@mathsppblog",
            git: "https://github.com/rodrigogiraoserrao",
        },
        teams: ["program"]
    },
    {
        name: "Laura Langdon",
        image: "/images/volunteers/laura-langdon.png",
        links: {
            git: "https://github.com/LauraLangdon",
            mastodon: "https://hachyderm.io/@LauraLangdon",
            linkedin: "https://linkedin.com/in/laura-langdon",
            website: "https://lauralangdon.io",
        },
        teams: ["program"],
    },
    {
        name: "Ellie Dela Cruz",
        image: "/images/volunteers/ellie_dela_cruz.png",
        links: {
          git: "https://github.com/elliedel",
            linkedin: "https://www.linkedin.com/in/elliedel/",
        },
        teams: ["program"]
    },
    {
        name: "Rodrigo Silva Ferreira",
        image: "/images/volunteers/rodrigosilvaferreira.jpg",
        links: {
            linkedin: "https://www.linkedin.com/in/rsf309",
            git: "https://github.com/rodrigosf672"
        },
        teams: ["communications"]
    },
    {
        name: "Parul Gupta",
        image: "/images/volunteers/parul_gupta.jpg",
        links: {
            git: "https://github.com/parulgupta1004",
            linkedin: "https://www.linkedin.com/in/parulgupta04/",
            website: "https://parulgupta1004.github.io/",
        },
        teams: ["program"]
    },
    {
        name: "Lokko Joyce Dzifa",
        image: "/images/volunteers/lokko_joyce.jpg",
        links: {
            linkedin: "https://www.linkedin.com/in/joyce-dzifa-lokko/",
            twitter: "https://x.com/DzifaLokko?s=20",
        },
        teams: ["communications"]
    },
    {
        name: "Wendy N. Sànchez",
        image: "/images/volunteers/wendy_n_sanchez.jpg",
        links: {
            linkedin: "https://www.linkedin.com/in/wendy-n-sanchez",
        },
        teams: ["communications"]
    },
    {
        name: "Ana C. Zanon",
        image: "/images/volunteers/ana_caloi.jpg",
        links: {
            linkedin: "https://www.linkedin.com/in/anacaloi",
            instagram: "https://www.instagram.com/anacaloi.data/",
        },
        teams: ["program"]
    },
    {
        name: "Thaily Samaniego",
        image: "/images/volunteers/thaily_samaniego.jpg",
        links: {
            linkedin: "https://www.linkedin.com/in/thsamaniego/",
            instagram: "https://www.instagram.com/thaisamfi/",
        },
        teams: ["program"]
    },
    {
        name: "Kalyan Prasad",
        image: "/images/volunteers/kalyan.jpg",
        links: {
            linkedin: "https://www.linkedin.com/in/itskpflow",
        },
        teams: ["program"]
    },
    {
        name: "Nydia Mejía",
        image: "/images/volunteers/nydia.jpg",
        links: {
            linkedin: "https://www.linkedin.com/in/nydia-mejia-004485237",
        },
        teams: ["communications"]
    },
    {
        name: "Raquel Dou",
        image: "https://avatars.githubusercontent.com/u/6319134",
        links : {
            git: "https://github.com/hypha",
        },
        teams: ["infrastructure"]
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
            team = team.toLowerCase(); // to avoid duplication
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
