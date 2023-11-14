//
//
//
//

export function GENERATE_id(prefix) {
  return prefix + Math.floor(100000 + Math.random() * 9000000);
}
export function GET_folderINFOS(vocabs) {
  return Object.values(vocabs.folders).map((folder) => ({ id: folder.id, title: folder.title }));
}
export function GET_storedVocabs() {
  return JSON.parse(localStorage.getItem("vocabs"));
}
export function STORE_vocabs(vocabsOBJ) {
  localStorage.setItem("vocabs", JSON.stringify(vocabsOBJ));
}
export function SHUFFLE_array(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

////////////////

function SORT_randomly(trIDs) {
  let sortedIDs = [...trIDs];

  for (let i = sortedIDs.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [sortedIDs[i], sortedIDs[j]] = [sortedIDs[j], sortedIDs[i]];
  }
  return sortedIDs;
}
function SORT_byColor(TRs, trIDs) {
  const colorsOBJ = trIDs.reduce(
    (colorsOBJ, trID) => {
      // possible colors are "high" / "medium" / "low"
      const color = TRs[trID].color;
      colorsOBJ[color].push(trID);
      return colorsOBJ;
    },
    { high: [], medium: [], low: [] },
  );
  return [...colorsOBJ.high, ...colorsOBJ.medium, ...colorsOBJ.low];
}
function SORT_byDate(TRs) {
  return Object.values(TRs)
    .sort((a, b) => b.created - a.created)
    .map((tr) => tr.id);
}
export function SORT_trIDs(TRs, trIDs, HOWtoSort) {
  if (HOWtoSort === "Random") {
    return SORT_randomly([...trIDs]);
  }
  if (HOWtoSort === "Color") {
    return SORT_byColor(TRs, [...trIDs]);
  }
  if (HOWtoSort === "Date") {
    return SORT_byDate(TRs);
  }
  console.error("ERROR with sorting function. Returning default");
  return trIDs;
}
export function FILTER_bySearch(vocabs, trIDs, searchTEXT) {
  return trIDs.filter((trID) => {
    const tr = vocabs.translations[trID];
    const ruleIDs = tr.ruleIDs;

    const eIDs = ruleIDs.reduce((exIDs, ruleID) => {
      for (let exID of vocabs.rules[ruleID].exampleIDs) {
        exIDs.push(exID);
      }
      return exIDs;
    }, []);

    console.log(eIDs);

    // const exIDs = Object.values(vocabs.examples).filter(e => )-
    const content = [
      tr.title.toLowerCase(),
      tr.translation.toLowerCase(),
      ...Object.values(vocabs.rules)
        .filter((rule) => ruleIDs.includes(rule.id))
        .map((r) => r.title.toLowerCase()),
      ...Object.values(vocabs.examples)
        .filter((ex) => eIDs.includes(ex.id))
        .map((e) => e.text.toLowerCase()),
    ];
    if (content.some((text) => text.includes(searchTEXT))) {
      return true;
    }
    return false;
  });
}
