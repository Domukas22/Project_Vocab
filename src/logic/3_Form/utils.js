//
//
//
//
//
export function SORT_examples(exIDs, exOBJS) {
  return exIDs.map((exID) => exOBJS[exID]).sort((a, b) => a.created + b.created);
}
export function SORT_rules(rules) {
  return Object.values(rules).sort((a, b) => a.created - b.created);
}
export function POPULATE_selectedTr(trID, vocabs) {
  const tr = { ...vocabs.translations[trID] };
  const rulesOBJ = tr.ruleIDs.reduce((obj, ruleID) => {
    const rule = Object.values(vocabs.rules).find((r) => r.id === ruleID);
    obj[ruleID] = rule;
    return obj;
  }, {});
  const examplesOBJ = Object.values(rulesOBJ).reduce((arr, rule) => {
    for (let exID of rule.exampleIDs) {
      arr[exID] = vocabs.examples[exID];
    }
    return arr;
  }, {});

  return {
    tr: { ...vocabs.translations[trID] },
    rules: rulesOBJ,
    examples: examplesOBJ,
  };
}
export function CLEAN_vocabs(newVOCABS, cleanupIDs) {
  const { rules, ex } = cleanupIDs;
  return {
    ...newVOCABS,
    // rules: [],
    rules: Object.fromEntries(Object.entries(newVOCABS.rules).filter(([ruleID, _]) => !rules.includes(ruleID))),
    examples: Object.fromEntries(Object.entries(newVOCABS.examples).filter(([exID, _]) => !ex.includes(exID))),
  };
}
