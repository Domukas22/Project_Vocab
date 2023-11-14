//
//
//

import { GENERATE_id } from "../4_General/general";

export function GENERATE_emptyEx() {
  return {
    id: GENERATE_id("ex"),
    text: "",
    created: +new Date(),
  };
}
export function GENERATE_emptyRule() {
  const newRuleID = GENERATE_id("rule");
  const newExampleID = GENERATE_id("ex");

  return {
    newRuleID,
    newExampleID,
    newRuleOBJ: {
      id: newRuleID,
      title: "",
      exampleIDs: [newExampleID],
      created: +new Date(),
    },
    newExampleOBJ: {
      id: newExampleID,
      text: "",
      created: +new Date(),
    },
  };
}
export function GENERATE_emptyTr() {
  // const initialRuleID = GENERATE_id("rule");
  // const initialExampleID = GENERATE_id("ex");

  return {
    tr: {
      id: GENERATE_id("tr"),
      title: "",
      translation: "",
      color: "low",
      ruleIDs: [],
      created: +new Date(),
    },
    rules: {
      // [initialRuleID]: {
      //   id: initialRuleID,
      //   title: "",
      //   exampleIDs: [initialExampleID],
      //   created: +new Date(),
      // },
    },
    examples: {
      // [initialExampleID]: {
      //   id: initialExampleID,
      //   text: "",
      //   created: +new Date(),
      // },
    },
  };
}
export function GENERATE_emptyCleanupIDs() {
  return {
    tr: [],
    rules: [],
    ex: [],
  };
}
