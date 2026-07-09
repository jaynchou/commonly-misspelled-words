export type WordEntry = {
  rank: number;
  word: string;
  misspellings: string[];
  definition: string;
  sentence: string;
  note: string;
  why: string;
  difficulty: "desk" | "copy chief" | "front page";
};

const coreWords = [
  ["accommodate", "accomodate,acommodate", "to provide room or fit a need", "Double c, double m."],
  ["achievement", "acheivement", "something accomplished", "I before e after h does not apply here."],
  ["acknowledge", "aknowledge,acknowlege", "to accept or recognize", "Keep the c and the d."],
  ["acquaintance", "acquaintence,aquaintance", "a person one knows slightly", "Acquaint ends with -ance."],
  ["acquire", "aquire", "to get or obtain", "The c follows the a."],
  ["across", "accross", "from one side to another", "Only one c."],
  ["address", "adress,addres", "a location or formal speech", "Double d, double s."],
  ["amateur", "amature", "nonprofessional", "Ends with -eur."],
  ["apparent", "aparent,apparant", "clearly visible or understood", "Two p letters, then -ent."],
  ["argument", "arguement", "a reasoned exchange", "Drop the e from argue."],
  ["attendance", "attendence", "being present", "Ends with -ance."],
  ["basically", "basicly", "in a basic way", "Keep the -ally ending."],
  ["beginning", "beggining,begining", "the start", "Double n in the middle."],
  ["believe", "beleive", "to accept as true", "I before e in believe."],
  ["bizarre", "bizare,bizzare", "strange or unusual", "One z, double r."],
  ["business", "buisness,busness", "commerce or work", "Business hides the i after s."],
  ["calendar", "calender", "date system", "Ends with -ar."],
  ["Caribbean", "Carribean,Carribbean", "region of the Caribbean Sea", "One r, double b."],
  ["cemetery", "cemetary", "burial ground", "All three vowels are e."],
  ["colleague", "collegue", "coworker", "Keep the -league ending."],
  ["committee", "commitee,comittee", "a group appointed for work", "Double m, double t, double e."],
  ["conscience", "consciense", "moral sense", "Science sits inside conscience."],
  ["conscious", "concious", "awake or aware", "Add the s after con."],
  ["definitely", "definately,definatly", "without doubt", "Think finite, not final."],
  ["dependent", "dependant", "relying on something", "The adjective usually ends -ent."],
  ["desperate", "desparate", "having urgent need", "The second vowel is e."],
  ["dilemma", "dilemna", "a difficult choice", "No n."],
  ["disappear", "dissapear,disapear", "to vanish", "Dis + appear."],
  ["discipline", "disipline", "training or control", "Keep the sc."],
  ["drunkenness", "drunkeness", "state of being drunk", "Double n before -ess."],
  ["embarrass", "embarass,embarras", "to cause shame", "Double r, double s."],
  ["environment", "enviroment", "surroundings", "Keep the n after enviro."],
  ["exaggerate", "exagerate,exxagerate", "to overstate", "Double g."],
  ["excellent", "exellent,excelent", "very good", "The c is followed by double l."],
  ["existence", "existance", "state of existing", "Ends with -ence."],
  ["experience", "experiance", "knowledge from events", "Ends with -ence."],
  ["February", "Febuary", "second month", "The first r is quiet but present."],
  ["foreign", "foriegn", "from another country", "E before i."],
  ["forty", "fourty", "number 40", "Drop the u from four."],
  ["friend", "freind", "person with affection", "Friend ends with -iend."],
  ["gauge", "guage", "measure or instrument", "The a comes before u."],
  ["government", "goverment", "public authority", "Keep the n."],
  ["grammar", "grammer", "language rules", "Ends with -ar."],
  ["guarantee", "garantee,guarentee", "formal promise", "The gua- opening matters."],
  ["harass", "harrass", "to bother repeatedly", "One r, double s."],
  ["height", "heighth,hieght", "distance upward", "Ends with -eight."],
  ["humorous", "humourous", "funny", "US spelling drops the u after humor."],
  ["ignorance", "ignorence", "lack of knowledge", "Ends with -ance."],
  ["immediate", "immediatly,imediate", "without delay", "Double m and the -ate ending."],
  ["independent", "independant", "self-governing", "Ends with -ent."],
  ["indispensable", "indispensible", "absolutely necessary", "Ends with -able."],
  ["intelligence", "inteligence,intelligance", "mental capacity", "Double l, ends -ence."],
  ["jewelry", "jewelery", "ornaments", "US spelling is jewelry."],
  ["judgment", "judgement", "decision or opinion", "US legal style often drops the e."],
  ["knowledge", "knowlege", "understanding", "Keep the d."],
  ["liaison", "liason", "communication link", "The second i is easy to miss."],
  ["library", "libary", "book collection", "The first r is quiet but present."],
  ["license", "lisence,licence", "official permission", "US noun and verb are license."],
  ["maintenance", "maintainance", "upkeep", "Maintenance changes maintain."],
  ["maneuver", "manuever", "skillful movement", "US spelling uses -euver."],
  ["millennium", "milennium,millenium", "period of a thousand years", "Double l and double n."],
  ["miniature", "minature", "very small version", "Keep the second i."],
  ["mischievous", "mischevious", "playfully troublesome", "No extra i after v."],
  ["necessary", "neccessary,necesary", "required", "One c, double s."],
  ["neighbor", "nieghbor", "nearby resident", "E before i in neighbor."],
  ["noticeable", "noticable", "easy to notice", "Keep the e to soften c."],
  ["occasion", "ocassion,occassion", "event or time", "Double c, one s."],
  ["occurred", "occured,ocurred", "happened", "Double c and double r."],
  ["occurrence", "occurence,ocurrence", "an event", "Double c, double r, -ence."],
  ["omitted", "omited", "left out", "Double t."],
  ["opportunity", "oppurtunity,oppertunity", "a chance", "Double p, then ortunity."],
  ["parallel", "paralell,parrallel", "side by side", "One r, double l at end."],
  ["pastime", "passtime", "hobby", "Past + time, one s."],
  ["perseverance", "perserverance", "steady persistence", "Persevere loses the second r."],
  ["personnel", "personel", "staff", "Double n, double l."],
  ["playwright", "playwrite", "writer of plays", "A wright makes things."],
  ["possession", "posession,possesion", "ownership", "Double s twice."],
  ["precede", "preceed", "to come before", "Ends with -cede."],
  ["privilege", "privelege,priviledge", "special right", "No d."],
  ["pronunciation", "pronounciation", "way a word is spoken", "Pronounce becomes pronunciation."],
  ["publicly", "publically", "in public", "Public + ly."],
  ["questionnaire", "questionaire", "set of questions", "Double n."],
  ["receive", "recieve", "to get", "I before e except after c."],
  ["recommend", "reccommend,recomend", "to advise", "One c, double m."],
  ["referred", "refered", "mentioned or directed", "Double r before -ed."],
  ["relevant", "relevent", "connected to the matter", "Ends with -ant."],
  ["restaurant", "restaraunt,resturant", "place to eat", "The au pair appears twice."],
  ["rhythm", "rythm,rhythym", "pattern of beats", "A vowel-light classic."],
  ["schedule", "schedual", "timetable", "Ends with -ule."],
  ["separate", "seperate", "apart", "There is a rat in separate."],
  ["sergeant", "sargent", "military rank", "The gea is unexpected."],
  ["successful", "succesful,successfull", "achieving a goal", "Double c, double s, one l at end."],
  ["supersede", "supercede", "to replace", "Only common English word ending -sede."],
  ["surprise", "suprise,surprize", "unexpected event", "Keep both r letters."],
  ["threshold", "threshhold", "entry point", "One h in the middle."],
  ["tomorrow", "tommorow,tomorow", "the day after today", "One m, double r."],
  ["twelfth", "twelth", "number 12 in order", "Keep the f."],
  ["tyranny", "tyrany", "cruel rule", "Double n."],
  ["until", "untill", "up to a time", "One l."],
  ["vacuum", "vaccum,vacume", "empty space or cleaner", "One c, double u."],
  ["weather", "wether", "atmospheric conditions", "Weather has ea."],
  ["weird", "wierd", "strange", "Weird breaks the rule."],
  ["whether", "wether", "if", "Whether has h after w."],
  ["writing", "writting", "forming text", "Drop the e, keep one t."]
] as const;

const prefixes = ["anti", "counter", "inter", "mis", "non", "over", "post", "pre", "re", "self", "sub", "under"];

function plausibleMisspellings(word: string, listed: string[]) {
  const variants = new Set(listed);
  const lower = word.toLowerCase();
  const substitutions: Array<[string, string]> = [
    ["ie", "ei"],
    ["ei", "ie"],
    ["ence", "ance"],
    ["ance", "ence"],
    ["able", "ible"],
    ["ible", "able"],
    ["ar", "er"],
    ["er", "ar"],
    ["ful", "full"],
    ["ally", "ly"]
  ];

  for (const [from, to] of substitutions) {
    if (lower.includes(from)) variants.add(lower.replace(from, to));
  }

  variants.add(lower.replace(/([bcdfghjklmnpqrstvwxyz])\1/g, "$1"));
  variants.add(lower.replace(/([aeiou])([bcdfghjklmnpqrstvwxyz])([aeiou])/, "$1$3"));

  const letters = lower.split("");
  for (let index = 1; index < letters.length - 1 && variants.size < 5; index += 1) {
    const copy = [...letters];
    [copy[index], copy[index + 1]] = [copy[index + 1], copy[index]];
    variants.add(copy.join(""));
  }

  return [...variants].filter((variant) => variant && variant !== lower).slice(0, 4);
}

export const wordBank: WordEntry[] = coreWords.map((item, index) => ({
  rank: index + 1,
  word: item[0],
  misspellings: plausibleMisspellings(item[0], item[1].split(",")),
  definition: item[2],
  sentence: `Choose the word that means ${item[2]}.`,
  note: item[3],
  why: `${item[0]} is often misspelled because ${item[3].toLowerCase()} The mistake usually comes from silent letters, doubled consonants, or a familiar spelling rule being applied in the wrong place.`,
  difficulty: index < 60 ? "desk" : index < 92 ? "copy chief" : "front page"
}));

export const expandedWordBank: WordEntry[] = [
  ...wordBank,
  ...prefixes.flatMap((prefix) =>
    wordBank.slice(0, 34).map((entry) => ({
      ...entry,
      rank: 0,
      word: `${prefix}${entry.word}`,
      misspellings: entry.misspellings.map((miss) => `${prefix}${miss}`),
      definition: `${prefix}-formed spelling practice built from "${entry.word}"`,
      note: `The base trap remains: ${entry.note}`,
      difficulty: "copy chief" as const
    }))
  )
]
  .slice(0, 500)
  .map((entry, index) => ({ ...entry, rank: index + 1 }));

function easternParts(date: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    hour12: false
  }).formatToParts(date);

  return {
    year: Number(parts.find((part) => part.type === "year")?.value || 0),
    month: Number(parts.find((part) => part.type === "month")?.value || 1),
    day: Number(parts.find((part) => part.type === "day")?.value || 1),
    hour: Number(parts.find((part) => part.type === "hour")?.value || 0)
  };
}

export function challengeId(date = new Date()) {
  const parts = easternParts(date);
  let gameDay = Date.UTC(parts.year, parts.month - 1, parts.day);
  if (parts.hour < 1) gameDay -= 24 * 60 * 60 * 1000;
  return new Date(gameDay).toISOString().slice(0, 10);
}

export function wordsForChallengeId(id: string, count = 20) {
  const dayKey = Number(id.replaceAll("-", ""));
  return [...wordBank]
    .map((entry, index) => {
      const score = Math.sin((index + 1) * 999 + dayKey) * 10000;
      return { entry, score: score - Math.floor(score) };
    })
    .sort((a, b) => a.score - b.score)
    .slice(0, count)
    .map(({ entry }) => entry);
}

export function dailyWords(date = new Date(), count = 20) {
  return wordsForChallengeId(challengeId(date), count);
}
