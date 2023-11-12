//
//
//

import { useState } from "react";
import { useEffect } from "react";
import { PRINT_colorChoiceBtn, GENERATE_id, GET_storedVocabs, STORE_vocabs } from "./utils";
import { terminal } from "virtual:terminal";

function FormTopFieldset({ HANLDE_InputChange, trTITLE, trTR }) {
  return (
    <fieldset>
      <div className="top">
        <legend>Titel / Übersetzung</legend>
        <div className="buttons"></div>
      </div>
      <div className="inputs">
        <div className="inputWRAP">
          <label htmlFor="title">Titel</label>
          <textarea
            type="text"
            name="title"
            id="title"
            placeholder="Titel eingeben..."
            onChange={HANLDE_InputChange}
            data-type="title"
            value={trTITLE}
          />
        </div>
        <div className="inputWRAP">
          <label htmlFor="translation">Übersetzung</label>
          <textarea
            type="text"
            name="translation"
            id="translation"
            placeholder="Übersetzung eingeben..."
            onChange={HANLDE_InputChange}
            data-type="translation"
            value={trTR}
          />
        </div>
      </div>
    </fieldset>
  );
}

function Example({ ex, onChangeFN, DELETE_example, parentRuleID }) {
  return (
    <div className="inputANDdeleteWRAP" key={ex.id}>
      <textarea
        type="text"
        placeholder="Beispiel eingeben..."
        data-id={ex.id}
        data-type="example"
        onChange={onChangeFN}
        value={ex.text}
      />
      <div className="button seeThrough" onClick={() => DELETE_example(parentRuleID, ex.id)}>
        <div className="xWRAP">
          <div className="xLINE"></div>
          <div className="xLINE second"></div>
        </div>
      </div>
    </div>
  );
}
function Rule({ rule, exIDs, exOBJS, DELETE_rule, ADD_example, DELETE_example, onChangeFN }) {
  return (
    <fieldset>
      <div className="top">
        <legend>Regel</legend>
        <div className="buttons">
          <div className="button" onClick={() => DELETE_rule(rule.id)}>
            Löschen
          </div>
        </div>
      </div>
      <div className="inputs">
        <div className={`inputWRAP title ${exIDs.length === 0 ? "noMargin" : ""}`}>
          <label htmlFor={"explanation_title"}>Regeltitel</label>
          <textarea
            type="text"
            placeholder={"Regel eingeben..."}
            data-type="rule"
            data-id={rule.id}
            onChange={onChangeFN}
            value={rule.title}
          />
        </div>
        <div className="inputWRAP examples">
          {exIDs.length > 0 && <label>Beispiele</label>}
          {SORT_examples(exIDs, exOBJS).map((ex) => {
            return (
              <Example
                ex={ex}
                onChangeFN={onChangeFN}
                DELETE_example={DELETE_example}
                parentRuleID={rule.id}
                key={ex.id}
              />
            );
          })}
        </div>
        <div
          className="button textLeft seeThrough"
          onClick={() => {
            ADD_example(rule.id);
          }}
        >
          + Beispiel hinfügen
        </div>
      </div>
    </fieldset>
  );
}

function SORT_examples(exIDs, exOBJS) {
  return exIDs.map((exID) => exOBJS[exID]).sort((a, b) => a.created + b.created);
}
function SORT_rules(rules) {
  return Object.values(rules).sort((a, b) => a.created - b.created);
}
function GENERATE_emptyEx() {
  return {
    id: GENERATE_id("ex"),
    text: "",
    created: +new Date(),
  };
}
function GENERATE_emptyRule() {
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
function GENERATE_emptyTr() {
  const initialRuleID = GENERATE_id("rule");
  const initialExampleID = GENERATE_id("ex");

  return {
    tr: {
      id: GENERATE_id("tr"),
      title: "",
      translation: "",
      color: "low",
      ruleIDs: [initialRuleID],
      created: +new Date(),
    },
    rules: {
      [initialRuleID]: {
        id: initialRuleID,
        title: "",
        exampleIDs: [initialExampleID],
        created: +new Date(),
      },
    },
    examples: {
      [initialExampleID]: {
        id: initialExampleID,
        text: "",
        created: +new Date(),
      },
    },
  };
}
function PREPARE_editTr(trID, vocabs) {
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
function GENERATE_emptyCleanupIDs() {
  return {
    tr: [],
    rules: [],
    ex: [],
  };
}

function CLEAN_vocabs(newVOCABS, cleanupIDs) {
  const { tr, rules, ex } = cleanupIDs;
  return {
    ...newVOCABS,
    // rules: [],
    rules: Object.fromEntries(Object.entries(newVOCABS.rules).filter(([ruleID, _]) => !rules.includes(ruleID))),
    examples: Object.fromEntries(Object.entries(newVOCABS.examples).filter(([exID, _]) => !ex.includes(exID))),
  };
}

export function Form({ ISopen, TOGGLE_form, vocabs, SET_vocabs, trEditID, DELETE_tr }) {
  const [trOBJ, SET_trObj] = useState(GENERATE_emptyTr());
  const [cleanupIDs, SET_cleanupIDs] = useState(GENERATE_emptyCleanupIDs());

  useEffect(() => {
    if (trEditID !== undefined) {
      SET_trObj(PREPARE_editTr(trEditID, vocabs));
    } else {
      SET_trObj(GENERATE_emptyTr());
    }
  }, [trEditID]);

  useEffect(() => {
    terminal.log("------------------");
    terminal.log("------------------");
    terminal.log("------------------");
    console.log(vocabs.translations["t111"].color);
  });

  function ADD_rule() {
    const { newRuleID, newExampleID, newRuleOBJ, newExampleOBJ } = GENERATE_emptyRule();
    SET_trObj((oldTR) => {
      return {
        tr: { ...oldTR.tr, ruleIDs: [...oldTR.tr.ruleIDs, newRuleID] },
        rules: { ...oldTR.rules, [newRuleID]: newRuleOBJ },
        examples: { ...oldTR.examples, [newExampleID]: newExampleOBJ },
      };
    });
  }
  function ADD_example(targetRuleID) {
    const newExample = GENERATE_emptyEx();
    SET_trObj((oldTR) => {
      return {
        tr: { ...oldTR.tr },
        rules: {
          ...oldTR.rules,
          [targetRuleID]: {
            ...oldTR.rules[targetRuleID],
            exampleIDs: [...oldTR.rules[targetRuleID].exampleIDs, newExample.id],
          },
        },
        examples: { ...oldTR.examples, [newExample.id]: newExample },
      };
    });
  }
  function DELETE_example(targetRuleID, exampleID) {
    if (trEditID !== undefined) {
      SET_cleanupIDs((obj) => ({
        ...obj,
        ex: [...obj.rules, exampleID],
      }));
    }
    SET_trObj((oldTR) => {
      return {
        tr: { ...oldTR.tr },
        rules: {
          ...oldTR.rules,
          [targetRuleID]: {
            ...oldTR.rules[targetRuleID],
            exampleIDs: [...oldTR.rules[targetRuleID].exampleIDs.filter((exID) => exID !== exampleID)],
          },
        },
        examples: Object.fromEntries(Object.entries(oldTR.examples).filter(([exID, _]) => !exID.includes(exampleID))),
      };
    });
  }
  function DELETE_rule(ruleID) {
    const { [ruleID]: ruleToRemove, ...toKeepRULES } = trOBJ.rules;
    const exIDs = ruleToRemove.exampleIDs;

    if (trEditID !== undefined) {
      SET_cleanupIDs((obj) => ({
        ...obj,
        rules: [...obj.rules, ruleID],
        ex: [...obj.ex, ...exIDs],
      }));
    }

    // Remove the rule and its examples
    SET_trObj((oldTR) => {
      return {
        tr: { ...oldTR.tr, ruleIDs: oldTR.tr.ruleIDs.filter((id) => id !== ruleID) },
        rules: toKeepRULES,
        examples: Object.fromEntries(Object.entries(oldTR.examples).filter(([exID, _]) => !exIDs.includes(exID))),
      };
    });
  }
  function HANLDE_InputChange(e) {
    const type = e.target.dataset.type;
    const value = e.target.value;

    if (type === "title") {
      SET_trObj((oldTR) => ({ ...oldTR, tr: { ...oldTR.tr, title: value } }));
    }
    if (type === "translation") {
      SET_trObj((oldTR) => ({ ...oldTR, tr: { ...oldTR.tr, translation: value } }));
    }
    if (type === "rule") {
      const id = e.target.dataset.id;
      SET_trObj((oldTR) => ({ ...oldTR, rules: { ...oldTR.rules, [id]: { ...oldTR.rules[id], title: value } } }));
    }
    if (type === "example") {
      const id = e.target.dataset.id;
      SET_trObj((oldTR) => ({
        ...oldTR,
        examples: { ...oldTR.examples, [id]: { ...oldTR.examples[id], text: value } },
      }));
    }
  }
  function EDIT_color(color) {
    SET_trObj((oldOBJ) => ({
      ...oldOBJ,
      tr: {
        ...oldOBJ.tr,
        color: color,
      },
    }));
  }

  function RESET_form() {
    SET_trObj(() => GENERATE_emptyTr());
    SET_cleanupIDs(() => GENERATE_emptyCleanupIDs());
    TOGGLE_form();
  }
  function ADD_tr() {
    const newVOCABS = {
      ...vocabs,
      folders: {
        ...vocabs.folders,
        [vocabs.displayed]: {
          ...vocabs.folders[vocabs.displayed],
          translationIDs: Array.from(new Set([trOBJ.tr.id, ...vocabs.folders[vocabs.displayed].translationIDs])),
        },
      },
      translations: { ...vocabs.translations, [trOBJ.tr.id]: trOBJ.tr },
      rules: { ...vocabs.rules, ...trOBJ.rules },
      examples: { ...vocabs.examples, ...trOBJ.examples },
    };

    const cleanVOCABS = CLEAN_vocabs(newVOCABS, cleanupIDs);
    console.log(cleanVOCABS.translations[trOBJ.tr.id].color);

    SET_vocabs(cleanVOCABS);
    STORE_vocabs(cleanVOCABS);
    RESET_form();
  }

  return (
    <div className="formWRAP" data-open={ISopen}>
      <form action="submit" className="bigForm" data-color={trOBJ.tr.color}>
        <div className="top">
          <div className="textWRAP">
            <h1 className="formTITLE">Übersetzung {trEditID !== undefined ? "bearbeiten" : "hinfügen"}</h1>
            {trEditID !== undefined && <p>{trOBJ.tr.title}</p>}
          </div>
          <div className="btnWRAP">
            <PRINT_colorChoiceBtn UPDATE_color={EDIT_color} optionalCLASS={" seeThrough"} />
            <div className="button seeThrough" onClick={RESET_form}>
              <div className="xWRAP">
                <div className="xLINE"></div>
                <div className="xLINE second"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          <FormTopFieldset
            HANLDE_InputChange={HANLDE_InputChange}
            trTITLE={trOBJ.tr.title}
            trTR={trOBJ.tr.translation}
          />
          {SORT_rules(trOBJ.rules).map((rule) => {
            return (
              <Rule
                key={rule.id}
                rule={rule}
                exIDs={rule.exampleIDs}
                exOBJS={trOBJ.examples}
                DELETE_rule={DELETE_rule}
                ADD_example={ADD_example}
                DELETE_example={DELETE_example}
                onChangeFN={HANLDE_InputChange}
              />
            );
          })}
          <div className="button textLeft seeThrough" onClick={ADD_rule}>
            + Neuer Regel
          </div>
        </div>
        <div className="formEndBtnWRAP">
          {trEditID !== undefined && (
            <button className="button" onClick={() => DELETE_tr(trEditID)} type="button">
              Delete
            </button>
          )}
          <div className="button" onClick={RESET_form} type="button">
            Abbrechen
          </div>
          <div className="button" onClick={() => ADD_tr()} type="button">
            Speichern
          </div>
        </div>
      </form>
    </div>
  );
}

// generate apropriate ids
// ===> ids not attach to reeact components ------------------------------------------------->
