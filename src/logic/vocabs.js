//
//
//
//
//

const date = +new Date();

export const dummyVOCABS = {
  displayed: "german",
  folders: {
    german: {
      id: "german",
      title: "German",
      translationIDs: ["t111", "t777"],
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
      color: "medium",
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
