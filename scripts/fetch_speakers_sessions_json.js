import fs from "fs";
import path from "path";

const urlSpeakers = "https://programapi.conference.pyladies.com/speakers.json";
const urlSessions = "https://programapi.conference.pyladies.com/sessions.json";


const destFolder = "./src/data";

const destSpeakersPath = path.join(destFolder, "speakers.json");
const destSessionsPath = path.join(destFolder, "speakers_talks.json");

//Creates folder
fs.mkdirSync(destFolder, { recursive: true });

const speakersResult = await fetch(urlSpeakers);
if (!speakersResult.ok) throw new Error(`Error fetching data: ${speakersResult.status}`);

const speakers = await speakersResult.json();

const speakersArray = Object.entries(speakers).map(([key, value]) => ({
  id: key,
  ...value
}));

speakersArray.sort((a, b) =>
  (a.slug || "").localeCompare(b.slug || "", undefined, { sensitivity: "base" })
);

const orderedSpeakers = Object.fromEntries(
  speakersArray.map(s => [s.id, s])
);

fs.writeFileSync(destSpeakersPath, JSON.stringify(orderedSpeakers, null, 2));
console.log(`Speakers saved (ordered) in ${destSpeakersPath}`);


// fs.writeFileSync(destSpeakersPath, speakers);
// console.log(`Speakers saved in ${destSpeakersPath}`);

const sessionsResult = await fetch(urlSessions);
if (!sessionsResult.ok) throw new Error(`Error fetching data: ${sessionsResult.status}`);

const sessions = await sessionsResult.text();

fs.writeFileSync(destSessionsPath, sessions);

console.log(`Sessions saved in ${destSessionsPath}`);
