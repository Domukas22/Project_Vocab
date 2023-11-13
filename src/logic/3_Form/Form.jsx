//
//
//

import { useEffect, useState } from "react";
import { STORE_vocabs } from "../4_General/general";
import { terminal } from "virtual:terminal";
import { CLEAN_vocabs, POPULATE_selectedTr, SORT_examples, SORT_rules } from "./utils";
import { GENERATE_emptyEx, GENERATE_emptyRule, GENERATE_emptyTr, GENERATE_emptyCleanupIDs } from "./generate";
import { ChooseColorBox } from "../4_General/Comps_general";

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

function ADD_toCleanUp(oldCleanupOBJ, type, id, exIDs = null) {
  const newCleanupOBJ = { ...oldCleanupOBJ };
  if (type === "ex") {
    newCleanupOBJ.ex.push(id);
  }
  if (type === "rule&ex") {
    newCleanupOBJ.rules.push(id);
    newCleanupOBJ.ex.push(...exIDs);
  }

  return newCleanupOBJ;
}

export function Form({ ISopen, TOGGLE_form, vocabs, SET_vocabs, trEditID, DELETE_tr }) {
  const [trOBJ, SET_trObj] = useState(GENERATE_emptyTr());
  const [cleanupIDs, SET_cleanupIDs] = useState(GENERATE_emptyCleanupIDs());
  const ISanEdit = trEditID !== undefined;

  useEffect(() => {
    // insert tr info if it's an edit
    if (ISanEdit) {
      SET_trObj(POPULATE_selectedTr(trEditID, vocabs));
    } else {
      SET_trObj(GENERATE_emptyTr());
    }
  }, [trEditID]);

  useEffect(() => {
    terminal.log("------------------");
  });

  function ADD_rule() {
    const { newRuleID, newExampleID, newRuleOBJ, newExampleOBJ } = GENERATE_emptyRule();

    // add a new rule obj and it's ID to the parent translation
    SET_trObj((oldTR) => {
      return {
        tr: { ...oldTR.tr, ruleIDs: [...oldTR.tr.ruleIDs, newRuleID] },
        rules: { ...oldTR.rules, [newRuleID]: newRuleOBJ },
        examples: { ...oldTR.examples, [newExampleID]: newExampleOBJ },
      };
    });
  }
  function ADD_example(targetRuleID) {
    // add a new example obj and push it's ID to the respective rule
    const newExample = GENERATE_emptyEx();
    SET_trObj((oldTR) => ({
      tr: { ...oldTR.tr },
      rules: {
        ...oldTR.rules,
        [targetRuleID]: {
          ...oldTR.rules[targetRuleID],
          exampleIDs: [...oldTR.rules[targetRuleID].exampleIDs, newExample.id],
        },
      },
      examples: { ...oldTR.examples, [newExample.id]: newExample },
    }));
  }
  function DELETE_example(targetRuleID, exampleID) {
    if (ISanEdit) {
      SET_cleanupIDs((obj) => ADD_toCleanUp(obj, "ex", exampleID));
    }

    // delete example obj and it's id from parent rule
    SET_trObj((oldTR) => ({
      tr: { ...oldTR.tr },
      rules: {
        ...oldTR.rules,
        [targetRuleID]: {
          ...oldTR.rules[targetRuleID],
          exampleIDs: [...oldTR.rules[targetRuleID].exampleIDs.filter((exID) => exID !== exampleID)],
        },
      },
      examples: Object.fromEntries(Object.entries(oldTR.examples).filter(([exID, _]) => !exID.includes(exampleID))),
    }));
  }
  function DELETE_rule(ruleID) {
    const { [ruleID]: ruleToRemove, ...toKeepRULES } = trOBJ.rules;
    const toRemoveExIDs = ruleToRemove.exampleIDs;

    if (ISanEdit) {
      SET_cleanupIDs((obj) => ADD_toCleanUp(obj, "rule&ex", ruleID, toRemoveExIDs));
    }

    // delete rule obj and it's example objs
    SET_trObj((oldTR) => ({
      tr: { ...oldTR.tr, ruleIDs: oldTR.tr.ruleIDs.filter((id) => id !== ruleID) },
      rules: toKeepRULES,
      examples: Object.fromEntries(Object.entries(oldTR.examples).filter(([exID, _]) => !toRemoveExIDs.includes(exID))),
    }));
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
    // push the new tr ID to the folder tr ID list
    // add a new tr obj, as well as it's rule/example objs
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
            <h1 className="formTITLE">Übersetzung {ISanEdit ? "bearbeiten" : "hinfügen"}</h1>
            {ISanEdit && <p>{trOBJ.tr.title}</p>}
          </div>
          <div className="btnWRAP">
            <ChooseColorBox UPDATE_color={EDIT_color} optionalCLASS={" seeThrough"} />
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
          {ISanEdit && (
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
