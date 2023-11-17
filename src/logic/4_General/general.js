//
//
//
//

export function SCROLL_top() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}
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
function SORT_byDate(TRs, idLIST) {
  return Object.values(TRs)
    .filter((tr) => idLIST.includes(tr.id))
    .sort((a, b) => b.created - a.created)
    .map((tr) => tr.id);
}
export function SORT_trIDs(TRs, idLIST, HOWtoSort) {
  console.log("sort => " + HOWtoSort);
  if (HOWtoSort === "Random") {
    return SORT_randomly([...idLIST]);
  }
  if (HOWtoSort === "Color") {
    return SORT_byColor(TRs, [...idLIST]);
  }
  if (HOWtoSort === "Date") {
    return SORT_byDate(TRs, idLIST);
  }
  console.error("ERROR with sorting function. Returning default");
  return idLIST;
}
export function FILTER_bySearch(vocabs, idLIST, searchTEXT) {
  console.log("search => " + searchTEXT);
  return idLIST.filter((trID) => {
    const tr = vocabs.translations[trID];

    // check tr title/translation
    if (tr.title.toLowerCase().includes(searchTEXT) || tr.translation.toLowerCase().includes(searchTEXT)) {
      return true;
    }

    for (let ruleID of tr.ruleIDs) {
      // check each rule title + it's examples
      const rule = vocabs.rules[ruleID];
      if (rule.title.toLowerCase().includes(searchTEXT)) {
        return true;
      }

      for (let exID of rule.exampleIDs) {
        // check each ex text
        const example = vocabs.examples[exID];
        if (example && example.text.toLowerCase().includes(searchTEXT)) {
          return true;
        }
      }
    }

    return false;
  });
}
