//
//
//

import { useState } from "react";
import { PRINT_colorChoiceBtn, GENERATE_id } from "./utils";

function FormTopFieldset({ HANLDE_InputChange }) {
  return (
    <fieldset>
      <div className="top">
        <legend>Titel / Übersetzung</legend>
        <div className="buttons"></div>
      </div>
      <div className="inputs">
        <div className="inputWRAP">
          <label htmlFor="title">Titel</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Titel eingeben..."
            onChange={HANLDE_InputChange}
            data-type="title"
          />
        </div>
        <div className="inputWRAP">
          <label htmlFor="translation">Übersetzung</label>
          <input
            type="text"
            name="translation"
            id="translation"
            placeholder="Übersetzung eingeben..."
            onChange={HANLDE_InputChange}
            data-type="translation"
          />
        </div>
      </div>
    </fieldset>
  );
}
function Example_NEW({ exID, typeFN }) {
  return (
    <div className="inputANDdeleteWRAP">
      <input type="text" placeholder="Beispiel eingeben..." data-id={exID} data-type="example" onChange={typeFN} />
      <div className="button" data-id={exID} onClick={() => console.log("Delete example")}>
        x
      </div>
    </div>
  );
}
function Rule_NEW({ ruleID, typeFN, children }) {
  return (
    <fieldset>
      <div className="top">
        <legend>Regel</legend>
        <div className="buttons">
          <div className="button">Löschen</div>
        </div>
      </div>
      <div className="inputs">
        <div className="inputWRAP title">
          <label htmlFor={"explanation_title"}>Regeltitel</label>
          <input type="text" placeholder={"Regel eingeben..."} data-type="rule" data-id={ruleID} onChange={typeFN} />
        </div>
        <div className="inputWRAP examples">{children}</div>
        <div className="button">+ Beispiel hinfügen</div>
      </div>
    </fieldset>
  );
}

export function Form({ setTranslations, ISopen, TOGGLE_bigForm }) {
  // const [creationSTATE, SET_creationSTATE] = useState("add");

  const initialRuleID = GENERATE_id();
  const initialExampleID = GENERATE_id();

  const [trINFO, SET_trInfo] = useState({
    body: {
      id: GENERATE_id(),
      title: "",
      translation: "",
      color: "low",
      ruleIDs: [initialRuleID],
    },
    rules: {
      [initialRuleID]: {
        id: initialRuleID,
        title: "",
        exampleIDs: [initialExampleID],
      },
    },
    examples: {
      [initialExampleID]: {
        id: initialExampleID,
        text: "",
      },
    },
  });

  function ADD_rule() {
    const newRuleID = GENERATE_id();
    const newExampleID = GENERATE_id();
    const newRuleOBJ = {
      id: newRuleID,
      title: "",
      exampleIDs: [newExampleID],
    };
    const newExampleOBJ = {
      id: newExampleID,
      text: "",
    };

    SET_trInfo((oldTR) => ({
      ...oldTR,
      rules: { ...oldTR.rules, [newRuleID]: newRuleOBJ },
      examples: { ...oldTR.examples, [newExampleID]: newExampleOBJ },
    }));
    console.log(trINFO.rules);
  }

  function DELETE_rule(toDeleteID) {}
  const HANLDE_InputChange = (e) => {
    const type = e.target.dataset.type;
    const value = e.target.value;

    if (type === "title") {
      SET_trInfo((oldTR) => ({ ...oldTR, title: value }));
    }
    if (type === "translation") {
      SET_trInfo((oldTR) => ({ ...oldTR, translation: value }));
    }
    if (type === "rule") {
      const id = e.target.dataset.id;
      SET_trInfo((oldTR) => ({ ...oldTR, rules: { ...oldTR.rules, [id]: { ...oldTR.rules[id], title: value } } }));
    }
    if (type === "example") {
      const id = e.target.dataset.id;
      SET_trInfo((oldTR) => ({
        ...oldTR,
        examples: { [id]: { ...oldTR.examples[id], text: value }, ...oldTR.examples },
      }));
    }
  };

  return (
    <div className="formWRAP" data-open={ISopen}>
      <form action="submit" className="bigForm">
        <div className="top" onClick={TOGGLE_bigForm}>
          <div className="textWRAP">
            <h1 className="formTITLE">
              {"Übersetzung hinfügen"}
              {/* {creationSTATE === "add" ? "hinfügen" : "bearbeiten"} */}
            </h1>
          </div>
          <div className="btnWRAP"></div>
        </div>
        <div className="content">
          <FormTopFieldset HANLDE_InputChange={HANLDE_InputChange} />
          {Object.values(trINFO.rules).map((rule) => {
            return (
              // for each rule in translation, print it with it's examples
              <Rule_NEW key={rule.id} ruleID={rule.id} typeFN={HANLDE_InputChange}>
                {rule.exampleIDs.map((exID) => (
                  <Example_NEW key={exID} exID={exID} typeFN={HANLDE_InputChange} />
                ))}
              </Rule_NEW>
            );
          })}
          <div className="button" onClick={ADD_rule}>
            + Neue Erklärung
          </div>
        </div>
        <div className="buttons"></div>
      </form>
    </div>
  );
}
