//
//
//
//
//

const date = +new Date();

export const dummyVOCABS = {
  folders: {
    german: {
      id: "german",
      title: "German",
      translationIDs: [
        "t111",
        "t777",
        "t2001",
        "t2002",
        "t2003",
        "t2004",
        "t2005",
        "t2006",
        "t2007",
        "t2008",
        "t2009",
        "t2010",
      ],
      created: date,
    },
    english: {
      id: "english",
      title: "English",
      translationIDs: [],
      created: date + 1,
    },
    french: {
      id: "french",
      title: "French",
      translationIDs: [],
      created: date + 2,
    },
  },
  translations: {
    t111: {
      id: "t111",
      title: "Jemandes Freiheit einschränken",
      translation: "Restrict someone's freedom",
      color: "low",
      ruleIDs: ["r222", "r444"],
      created: date + 3,
    },
    t777: {
      id: "t777",
      title: "Die Firma verfügt über modernste Technologien",
      translation: "The company has the most modern technologies",
      color: "low",
      ruleIDs: ["r888", "r2111"],
      created: date + 4,
    },
    t2001: {
      id: "t2001",
      title: "Am See spazieren gehen",
      translation: "Walk by the lake",
      color: "medium",
      ruleIDs: [],
      created: date + 16,
    },
    t2002: {
      id: "t2002",
      title: "Ein Buch lesen",
      translation: "Read a book",
      color: "low",
      ruleIDs: [],
      created: date + 17,
    },
    t2003: {
      id: "t2003",
      title: "Kaffee trinken",
      translation: "Drink coffee",
      color: "low",
      ruleIDs: [],
      created: date + 18,
    },
    t2004: {
      id: "t2004",
      title: "Musik hören",
      translation: "Listen to music",
      color: "low",
      ruleIDs: [],
      created: date + 19,
    },
    t2005: {
      id: "t2005",
      title: "Blumen pflanzen",
      translation: "Plant flowers",
      color: "high",
      ruleIDs: [],
      created: date + 20,
    },
    t2006: {
      id: "t2006",
      title: "Einen Brief schreiben",
      translation: "Write a letter",
      color: "low",
      ruleIDs: [],
      created: date + 21,
    },
    t2007: {
      id: "t2007",
      title: "Ein Fahrrad reparieren",
      translation: "Repair a bicycle",
      color: "medium",
      ruleIDs: [],
      created: date + 22,
    },
    t2008: {
      id: "t2008",
      title: "Einkaufen gehen",
      translation: "Go shopping",
      color: "high",
      ruleIDs: [],
      created: date + 23,
    },
    t2009: {
      id: "t2009",
      title: "Kochen lernen",
      translation: "Learn to cook",
      color: "medium",
      ruleIDs: ["r2333"],
      created: date + 24,
    },
    t2010: {
      id: "t2010",
      title: "Ein Auto fahren",
      translation: "Drive a car",
      color: "low",
      ruleIDs: [],
      created: date + 25,
    },
  },
  rules: {
    r222: {
      id: "r222",
      title: "Jemanden in etwas einschränken",
      exampleIDs: ["e333"],
      created: date + 5,
    },
    r444: {
      id: "r444",
      title: "Etwas auf etwas / jemanden einschränken",
      exampleIDs: ["e555", "e666"],
      created: date + 6,
    },
    r888: {
      id: "r888",
      title: "Über etwas verfügen",
      exampleIDs: ["e999", "e1111"],
      created: date + 7,
    },
    r2111: {
      id: "r2111",
      title: "Etwas behördlich, dienstlich anordnen, bestimmen, befehlen",
      exampleIDs: ["e3111", "e4111"],
      created: date + 8,
    },
    r2333: {
      id: "r2333",
      title: "Etwas Neues lernen",
      exampleIDs: [],
      created: date + 26,
    },
  },
  examples: {
    e333: {
      id: "e333",
      text: "Er wurde in seiner Bewegungsfreiheit, Handlungsfreiheit eingeschränkt",
      created: date + 9,
    },
    e555: {
      id: "e555",
      text: "Wir müssen die Redezeit auf zehn Minuten einschränken",
      created: date + 10,
    },
    e666: {
      id: "e666",
      text: "Sie hat das Rauchen jetzt auf einige wenige Zigaretten pro Tag eingeschränkt",
      created: date + 11,
    },
    e999: {
      id: "e999",
      text: "Er verfügt über reiche Erfahrungen",
      created: date + 12,
    },
    e1111: {
      id: "e1111",
      text: "Im Urlaub verfügte er über die nötige Zeit für seinen Garten",
      created: date + 13,
    },
    e3111: {
      id: "e3111",
      text: "Das Ministerium verfügte den Ausbau des Straßennetzes",
      created: date + 14,
    },
    e4111: {
      id: "e4111",
      text: "Das vollziehende und verfügende Organ der Volksvertretung, der Rat",
      created: date + 15,
    },
  },
};
