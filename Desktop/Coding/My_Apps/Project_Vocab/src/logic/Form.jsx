//
//
//

import { useState } from "react";
import { PRINT_colorChoiceBtn, GENERATE_id } from "./utils";

const explanationOBJ = () => {
  console.log("sssss");
  return {
    id: GENERATE_id(),
    title: "",
    examplesARR: [
      {
        id: GENERATE_id(),
        text: "",
      },
    ],
  };
};

function PRINT_textInput({ type, id, placeholder, value = "", onInputChange, parentid = undefined }) {
  return (
    <input
      type="text"
      data-typo={type}
      name={type + id}
      id={type + id}
      data-realid={id}
      placeholder={placeholder}
      value={value}
      onChange={onInputChange}
      data-parentid={parentid}
    />
  );
}

function PRINT_explanationFieldset({ exOBJ, DELETE_explanation, onInputChange }) {
  const { id, title, examplesARR } = exOBJ;
  const [examples, setExamples] = useState(examplesARR);

  function ADD_example() {
    setExamples((x) => [...x, { id: GENERATE_id(), text: "" }]);
  }
  function DELETE_example(toDeleteID) {
    setExamples((x) => [...x].filter((y) => y.id !== toDeleteID));
  }

  return (
    <fieldset>
      <div className="top">
        <legend>Erklärung</legend>
        <div className="buttons">
          <div className="button" onClick={() => DELETE_explanation(id)}>
            Löschen
          </div>
        </div>
      </div>
      <div className="inputs">
        <div className="inputWRAP title">
          <label htmlFor={"explanation_title" + id}>Erklärungstitel</label>
          <PRINT_textInput
            type={"explanation_title"}
            id={id}
            placeholder={"Erklärung eingeben..."}
            onInputChange={onInputChange}
            value={title}
          />
        </div>
        <div className="inputWRAP examples">
          {examples.length > 0 && <label>Beispiele</label>}

          {examples.map((ex) => {
            return (
              <div className="inputANDdeleteWRAP" key={ex.id}>
                <PRINT_textInput
                  type={"explanation_example"}
                  id={ex.id}
                  placeholder={"Beispiel eingeben..."}
                  onInputChange={onInputChange}
                  value={ex.text}
                  parentid={id}
                />
                <div className="button" onClick={() => DELETE_example(ex.id)}>
                  x
                </div>
              </div>
            );
          })}
        </div>
        <div className="button" onClick={ADD_example}>
          + Beispiel hinfügen
        </div>
      </div>
    </fieldset>
  );
}

export function PRINT_form({ setTranslations, ISopen, TOGGLE_bigForm }) {
  const [state, setState] = useState("add");
  const [newTranslation, setNewTranslation] = useState({
    id: GENERATE_id(),
    text: "",
    translation: "",
    explanationsARR: [
      {
        id: GENERATE_id(),
        title: "",
        examplesARR: [
          {
            id: GENERATE_id(),
            text: "",
          },
        ],
      },
    ],
    color: "low",
  });

  function ADD_explanation() {
    setNewTranslation((x) => ({ ...x, explanationsARR: [...x.explanationsARR, explanationOBJ()] }));
  }
  function DELETE_explanation(toDeleteID) {
    setNewTranslation((x) => ({ ...x, explanationsARR: [...x.explanationsARR].filter((x) => x.id !== toDeleteID) }));
  }
  const HANLDE_InputChange = (e) => {
    const { name, value } = e.target;

    if (e.target.dataset.typo === "explanation_title") {
      const targetID = parseInt(e.target.dataset.realid);
      setNewTranslation((prevTR) => ({
        ...prevTR,
        explanationsARR: prevTR.explanationsARR.map((exOBJ) => {
          if (exOBJ.id === targetID) {
            return { ...exOBJ, title: value };
          }
          return { ...exOBJ };
        }),
      }));
    } else {
      setNewTranslation((prevTR) => ({
        ...prevTR,
        [name]: value,
      }));
    }
  };

  return (
    <div className="formWRAP" data-open={ISopen}>
      <form action="submit" className="bigForm">
        <div className="top" onClick={TOGGLE_bigForm}>
          <div className="textWRAP">
            <h1 className="formTITLE">
              {"Übersetzung "}
              {state === "add" ? "hinfügen" : "bearbeiten"}
            </h1>
          </div>
          <div className="btnWRAP"></div>
        </div>
        <div className="content">
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
                />
              </div>
            </div>
          </fieldset>
          {newTranslation.explanationsARR.map((exOBJ) => {
            return (
              <PRINT_explanationFieldset
                key={exOBJ.id}
                exOBJ={exOBJ}
                DELETE_explanation={DELETE_explanation}
                onInputChange={HANLDE_InputChange}
              />
            );
          })}
          <div className="button" onClick={ADD_explanation}>
            + Neue Erklärung
          </div>
        </div>
        <div className="buttons"></div>
      </form>
    </div>
  );
}
