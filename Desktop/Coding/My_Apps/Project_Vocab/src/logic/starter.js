//
//
//
//
//

export const dummyVOCABS = {
  displayed: "german",
  folders: {
    german: {
      id: "german",
      title: "German",
      translationIDs: ["t111", "t777"],
      ruleIDs: ["r222", "r444", "r888", "r2111"],
      exampleIDs: ["e333", "e555", "e666", "e999", "e1111", "e3111", "e4111"],
    },
    english: {
      id: "english",
      title: "English",
      translationIDs: [],
      ruleIDs: [],
      exampleIDs: [],
    },
    french: {
      id: "french",
      title: "French",
      translationIDs: [],
      ruleIDs: [],
      exampleIDs: [],
    },
  },
  translations: {
    t111: {
      id: "t111",
      title: "Jemandes Freiheit einschränken",
      translation: "Restrict someone's freedom",
      color: "medium",
      ruleIDs: ["r222", "r444"],
    },
    t777: {
      id: "t777",
      title: "Die Firma verfügt über modernste Technologien",
      translation: "The company has the most modern technologies",
      color: "low",
      ruleIDs: ["r888", "r2111"],
    },
  },
  rules: {
    r222: {
      id: "r222",
      title: "Jemanden in etwas einschränken",
      exampleIDs: ["e333"],
    },
    r444: {
      id: "r444",
      title: "Etwas auf etwas / jemanden einschränken",
      exampleIDs: ["e555", "e666"],
    },
    r888: {
      id: "r888",
      title: "Über etwas verfügen",
      exampleIDs: ["e999", "e1111"],
    },
    r2111: {
      id: "r2111",
      title: "Etwas behördlich, dienstlich anordnen, bestimmen, befehlen",
      exampleIDs: ["e3111", "e4111"],
    },
  },
  examples: {
    e333: {
      id: "e333",
      text: "Er wurde in seiner Bewegungsfreiheit, Handlungsfreiheit eingeschränkt",
    },
    e555: {
      id: "e555",
      text: "Wir müssen die Redezeit auf zehn Minuten einschränken",
    },
    e666: {
      id: "e666",
      text: "Sie hat das Rauchen jetzt auf einige wenige Zigaretten pro Tag eingeschränkt",
    },
    e999: {
      id: "e999",
      text: "Er verfügt über reiche Erfahrungen",
    },
    e1111: {
      id: "e1111",
      text: "Im Urlaub verfügte er über die nötige Zeit für seinen Garten",
    },
    e3111: {
      id: "e3111",
      text: "Das Ministerium verfügte den Ausbau des Straßennetzes",
    },
    e4111: {
      id: "e4111",
      text: "Das vollziehende und verfügende Organ der Volksvertretung, der Rat",
    },
  },
};
