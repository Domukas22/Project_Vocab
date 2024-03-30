//
//
//

import { useEffect, useState, useRef, useReducer } from "react";
import { STORE_vocabs } from "../4_General/general";
import { CLEAN_vocabs, POPULATE_selectedTr, SORT_examples, SORT_rules } from "./utils";
import { GENERATE_emptyEx, GENERATE_emptyRule, GENERATE_emptyTr, GENERATE_emptyCleanupIDs } from "./generate";
import { ChooseColorBox } from "../4_General/Comps_general";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { func } from "prop-types";

function FormTopFieldset({ HANLDE_InputChange, trTITLE, trTR }) {
  const titleTEXT = useRef(null);
  const translationTEXT = useRef(null);

  function paste(e) {
    e.preventDefault();
    let text = e.clipboardData ? e.clipboardData.getData("text/plain") : "";

    if (document.getSelection) {
      const selection = document.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        console.log(range);
        range.deleteContents();

        const textNode = document.createTextNode(text);
        range.insertNode(textNode);

        // Move the cursor to the end of the inserted text
        range.selectNodeContents(textNode);
        range.collapse(false); // false collapses the range to the end point
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }
  useEffect(() => {
    // insert tr title + translation only on load, NOT on onChange/onInput
    titleTEXT.current.innerHTML = trTITLE;
    translationTEXT.current.innerHTML = trTR;
  }, []);

  return (
    <fieldset>
      <div className="top">
        <legend>Titel / Übersetzung</legend>
        <div className="buttons"></div>
      </div>
      <div className="inputs">
        <div className="inputWRAP">
          <label htmlFor="title">Titel</label>
          <div
            className="textEdit"
            contentEditable="true"
            onInput={HANLDE_InputChange}
            data-type="title"
            ref={titleTEXT}
            onPaste={paste}
          ></div>
        </div>
        <div className="inputWRAP">
          <label htmlFor="translation">Übersetzung</label>
          <div
            data-type="translation"
            className="textEdit"
            contentEditable="true"
            onInput={HANLDE_InputChange}
            ref={translationTEXT}
          ></div>
        </div>
      </div>
    </fieldset>
  );
}
function Example({ ex, onChangeFN, DELETE_example, parentRuleID }) {
  const exText = useRef(null);
  useEffect(() => {
    // insert ex text only on load, NOT on onChange/onInput
    if (ex.text !== null) exText.current.innerHTML = ex.text;
  }, []);

  return (
    <div className="exampleWRAP">
      <div className="inputANDdeleteWRAP" key={ex.id}>
        <div
          ref={exText}
          className="textEdit"
          data-type="example"
          contentEditable="true"
          onInput={onChangeFN}
          data-id={ex.id}
        ></div>
        <div className="button seeThrough X" onClick={() => DELETE_example(parentRuleID, ex.id)}>
          <div className="xWRAP">
            <div className="xLINE"></div>
            <div className="xLINE second"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
function Rule({ rule, exIDs, exOBJS, DELETE_rule, ADD_example, DELETE_example, onChangeFN }) {
  const ruleTitle = useRef(null);
  useEffect(() => {
    // insert rule title only on load, NOT on onChange/onInput
    if (rule.title !== null) ruleTitle.current.innerHTML = rule.title;
  }, []);

  return (
    <div className="fieldsetWRAP">
      <fieldset>
        <div className="top">
          <legend>Regel</legend>
          <div className="buttons">
            <div className="button textOnly" onClick={() => DELETE_rule(rule.id)}>
              Löschen
            </div>
          </div>
        </div>
        <div className="inputs">
          <div className={`inputWRAP title ${exIDs.length === 0 ? "noMargin" : ""}`}>
            <label htmlFor={"explanation_title"}>Regeltitel</label>
            <div
              data-type="rule"
              ref={ruleTitle}
              className="textEdit"
              contentEditable="true"
              onInput={onChangeFN}
              data-id={rule.id}
            ></div>
          </div>
          <div className="inputWRAP examples">
            {exIDs.length > 0 && <label>Beispiele</label>}
            <AnimatePresence>
              {SORT_examples(exIDs, exOBJS).map((ex) => {
                return (
                  <motion.div
                    className="examplePREWRAP"
                    key={ex.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0, pointerEvents: "none" }}
                    transition={{ ease: "easeIn", duration: 0.2 }}
                  >
                    <Example
                      ex={ex}
                      onChangeFN={onChangeFN}
                      DELETE_example={DELETE_example}
                      parentRuleID={rule.id}
                      key={ex.id}
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
          <div
            className="button textLeft seeThrough add"
            onClick={() => {
              ADD_example(rule.id);
            }}
          >
            + Beispiel hinfügen
          </div>
        </div>
      </fieldset>
    </div>
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

function trObjREDUCER(state, actionOBJ) {
  switch (actionOBJ.type) {
    case "ADD_rule":
      {
        const { newRuleID, newExampleID, newRuleOBJ, newExampleOBJ } = GENERATE_emptyRule();

        actionOBJ.fn((oldTR) => {
          return {
            tr: { ...oldTR.tr, ruleIDs: [...oldTR.tr.ruleIDs, newRuleID] },
            rules: { ...oldTR.rules, [newRuleID]: newRuleOBJ },
            examples: { ...oldTR.examples, [newExampleID]: newExampleOBJ },
          };
        });
      }
      break;
    default: {
      throw Error("Unknown action: " + actionOBJ.type);
    }
  }
}

export function Form({ ISopen, TOGGLE_form, vocabs, SET_vocabs, trEditID, dispFolderID }) {
  const ISanEdit = trEditID !== undefined;

  const [trOBJ, SET_trObj] = useState(ISanEdit ? POPULATE_selectedTr(trEditID, vocabs) : GENERATE_emptyTr());
  const [cleanupIDs, SET_cleanupIDs] = useState(GENERATE_emptyCleanupIDs());

  // CREATE A REDUCER
  // const [trOBJ, SET_trObj] = useState(ISanEdit ? POPULATE_selectedTr(trEditID, vocabs) : GENERATE_emptyTr());
  const [trOBJ_2, dispatch] = useReducer(
    trObjREDUCER,
    ISanEdit ? POPULATE_selectedTr(trEditID, vocabs) : GENERATE_emptyTr(),
  );

  const UPDATE_trObj = (updateFunction) => {
    SET_trObj((oldTR) => updateFunction(oldTR));
  };

  function ADD_rule_2() {
    dispatch({ type: "ADD_rule", fn: (obj) => console.log(obj) });
  }

  function ADD_rule() {
    ADD_rule_2();
    const { newRuleID, newExampleID, newRuleOBJ, newExampleOBJ } = GENERATE_emptyRule();

    // add a new rule obj and it's ID to the parent translation
    UPDATE_trObj((oldTR) => {
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
    UPDATE_trObj((oldTR) => ({
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
    UPDATE_trObj((oldTR) => ({
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
    UPDATE_trObj((oldTR) => ({
      tr: { ...oldTR.tr, ruleIDs: oldTR.tr.ruleIDs.filter((id) => id !== ruleID) },
      rules: toKeepRULES,
      examples: Object.fromEntries(Object.entries(oldTR.examples).filter(([exID, _]) => !toRemoveExIDs.includes(exID))),
    }));
  }
  function HANLDE_InputChange(e) {
    const { dataset, innerHTML } = e.target;
    console.log(e.target.innerHTML);

    UPDATE_trObj((oldTR) => {
      const newTR = { ...oldTR };
      switch (dataset.type) {
        case "title":
          newTR.tr = { ...oldTR.tr, title: innerHTML };
          break;
        case "translation":
          newTR.tr = { ...oldTR.tr, translation: innerHTML };
          break;
        case "rule":
          newTR.rules[dataset.id] = { ...oldTR.rules[dataset.id], title: innerHTML };
          break;
        case "example":
          newTR.examples[dataset.id] = { ...oldTR.examples[dataset.id], text: innerHTML };
          break;
        default:
          console.error("ERROR with HANLDE_InputChange()");
      }
      // console.log(newTR.tr.title);
      return newTR;
    });
  }
  function EDIT_color(color) {
    UPDATE_trObj((oldOBJ) => ({
      ...oldOBJ,
      tr: {
        ...oldOBJ.tr,
        color: color,
      },
    }));
  }

  function RESET_form() {
    SET_cleanupIDs(() => GENERATE_emptyCleanupIDs());
    TOGGLE_form(false);
  }
  function ADD_tr() {
    // push the new tr ID to the folder tr ID list
    // add a new tr obj, as well as it's rule/example objs

    // if its NOT an edit, insert new tr ID, otherwise keep the same ID list
    const newTrIDs = ISanEdit
      ? [...vocabs.folders[dispFolderID].translationIDs]
      : Array.from(new Set([trOBJ.tr.id, ...vocabs.folders[dispFolderID].translationIDs]));

    const newVOCABS = {
      ...vocabs,
      folders: {
        ...vocabs.folders,
        [dispFolderID]: {
          ...vocabs.folders[dispFolderID],
          translationIDs: newTrIDs,
        },
      },
      translations: { ...vocabs.translations, [trOBJ.tr.id]: trOBJ.tr },
      rules: { ...vocabs.rules, ...trOBJ.rules },
      examples: { ...vocabs.examples, ...trOBJ.examples },
    };

    const cleanVOCABS = CLEAN_vocabs(newVOCABS, cleanupIDs);

    SET_vocabs(cleanVOCABS);
    STORE_vocabs(cleanVOCABS);
    RESET_form();
  }
  function DELETE_tr(trID) {
    console.log("DELETE => " + trID);
    const ruleIDs = vocabs.translations[trID].ruleIDs;
    const exIDs = ruleIDs.reduce((arr, ruleID) => {
      for (let exID of vocabs.rules[ruleID].exampleIDs) {
        arr.push(exID);
      }
      return arr;
    }, []);

    // delete tr ID from parent folder
    // delete tr, as well as it's rules and their examples
    const newVOCABS = {
      ...vocabs,
      folders: {
        ...vocabs.folders,
        [dispFolderID]: {
          ...vocabs.folders[dispFolderID],
          translationIDs: [...vocabs.folders[dispFolderID].translationIDs].filter((tID) => tID !== trID),
        },
      },
      translations: Object.fromEntries(Object.entries(vocabs.translations).filter(([tID, _]) => tID !== trID)),
      rules: Object.fromEntries(Object.entries(vocabs.rules).filter(([rID, _]) => !ruleIDs.includes(rID))),
      examples: Object.fromEntries(Object.entries(vocabs.examples).filter(([eID, _]) => !exIDs.includes(eID))),
    };

    SET_vocabs(newVOCABS);
    STORE_vocabs(newVOCABS);
    RESET_form();
  }

  return (
    <div className="formWRAP" data-open={ISopen}>
      <form action="submit" className="bigForm" data-color={trOBJ.tr.color}>
        <div className="top">
          <div className="textWRAP">
            <h1 className="formTITLE">{ISanEdit ? "Bearbeiten" : "Hinfügen"}</h1>
            {ISanEdit && <p className="textEdit notEdit" dangerouslySetInnerHTML={{ __html: trOBJ.tr.title }}></p>}
          </div>
          <div className="btnWRAP">
            <ChooseColorBox UPDATE_color={EDIT_color} optionalCLASS={" seeThrough"} />
            <div className="button seeThrough X" onClick={RESET_form}>
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
          <AnimatePresence>
            {SORT_rules(trOBJ.rules).map((rule) => {
              return (
                <motion.div
                  key={rule.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0, pointerEvents: "none" }}
                  transition={{ ease: "easeIn", duration: 0.2 }}
                >
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
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        <div className="newRulePREWRAP">
          <div className="button textLeft seeThrough add" onClick={ADD_rule} style={{ padding: "4rem 2.4rem" }}>
            + Regel hinfügen
          </div>
        </div>
        <div className="formEndBtnWRAP">
          {ISanEdit && (
            <div className="button delete" onClick={() => DELETE_tr(trEditID)}>
              Delete
            </div>
          )}
          <div className="button cancel" onClick={RESET_form}>
            Abbrechen
          </div>
          <div className="button done" onClick={() => ADD_tr()}>
            {ISanEdit ? "Speichern" : "Hinfügen"}
          </div>
        </div>
      </form>
    </div>
  );
}
// ======> finish adding "Add Folder" functionality
export function FolderForm({ TOGGLE_folderForm, SET_vocabs, SET_dispFolderID }) {
  return (
    <div className="formWRAP" data-open={ISopen}>
      <form action="submit" className="bigForm" data-color={trOBJ.tr.color}>
        <div className="top">
          <div className="textWRAP">
            <h1 className="formTITLE">{ISanEdit ? "Bearbeiten" : "Hinfügen"}</h1>
            {ISanEdit && <p className="textEdit notEdit" dangerouslySetInnerHTML={{ __html: trOBJ.tr.title }}></p>}
          </div>
          <div className="btnWRAP">
            <div className="button seeThrough X" onClick={RESET_form}>
              <div className="xWRAP">
                <div className="xLINE"></div>
                <div className="xLINE second"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="inputWRAP">
          <label htmlFor="title">Titel</label>
          <div
            className="textEdit"
            contentEditable="true"
            onInput={HANLDE_InputChange}
            data-type="title"
            ref={titleTEXT}
            onPaste={paste}
          ></div>
        </div>
      </form>
    </div>
  );
}

FormTopFieldset.propTypes = {
  HANLDE_InputChange: PropTypes.func.isRequired,
  trTITLE: PropTypes.string.isRequired,
  trTR: PropTypes.string.isRequired,
};
Example.propTypes = {
  ex: PropTypes.object.isRequired,
  onChangeFN: PropTypes.func.isRequired,
  DELETE_example: PropTypes.func.isRequired,
  parentRuleID: PropTypes.string.isRequired,
};
Rule.propTypes = {
  rule: PropTypes.object.isRequired,
  exIDs: PropTypes.array.isRequired,
  exOBJS: PropTypes.object.isRequired,
  DELETE_rule: PropTypes.func.isRequired,
  ADD_example: PropTypes.func.isRequired,
  DELETE_example: PropTypes.func.isRequired,
  onChangeFN: PropTypes.func.isRequired,
};
Form.propTypes = {
  ISopen: PropTypes.bool.isRequired,
  TOGGLE_form: PropTypes.func.isRequired,
  vocabs: PropTypes.object.isRequired,
  SET_vocabs: PropTypes.func.isRequired,
  trEditID: PropTypes.string,
  dispFolderID: PropTypes.string.isRequired,
};
