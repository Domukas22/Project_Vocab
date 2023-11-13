//
//
//
//

import { useState } from "react";
import { ChooseColorBox } from "../4_General/Comps_general";
import { STORE_vocabs } from "../4_General/general";

function Example({ id, text }) {
  return <li key={id}>{text}</li>;
}
function Rule({ ruleTITLE, exIDs, vocabs }) {
  return (
    <div className="rule">
      <h3>{ruleTITLE}</h3>
      <ul>
        {exIDs.map((exID) => {
          return <Example id={exID} text={vocabs.examples[exID].text} key={exID} />;
        })}
      </ul>
    </div>
  );
}
function Translation({ tr, vocabs, SET_trEdit, TOGGLE_form, SET_vocabs }) {
  const { color, title, translation, ruleIDs } = tr;
  const [isOpen, setIsOpen] = useState(false);

  function TOGGLE_open() {
    setIsOpen((state) => !state);
  }

  function UPDATE_color(color) {
    const newVOCABS = {
      ...vocabs,
      translations: { ...vocabs.translations, [tr.id]: { ...vocabs.translations[tr.id], color } },
    };
    SET_vocabs(newVOCABS);
    STORE_vocabs(newVOCABS);
  }

  return (
    <div className="translation" data-color={color} data-open={isOpen}>
      <div className="top" onClick={() => TOGGLE_open()}>
        <h1 className="regularTEXT title">{title}</h1>
      </div>
      <div className="bottom">
        <h2 className="translatedTEXT">→ {translation}</h2>
        {ruleIDs.map((ruleID) => {
          const rule = vocabs.rules[ruleID];
          return <Rule ruleTITLE={rule.title} exIDs={rule.exampleIDs} vocabs={vocabs} key={ruleID} />;
        })}
        <div className="translationBtnWRAP">
          <div
            className="button"
            style={{ flex: 1, textAlign: "center" }}
            onClick={() => {
              SET_trEdit(tr.id);
              TOGGLE_form();
            }}
          >
            Bearbeiten
          </div>
          <ChooseColorBox UPDATE_color={UPDATE_color} />
          <div className="button" onClick={() => TOGGLE_open()}>
            <div className="checkWRAP">
              <div className="checkLINE"></div>
              <div className="checkLINE second"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export function TranslationBoard({ trIDs, vocabs, SET_trEdit, TOGGLE_form, SET_vocabs }) {
  if (trIDs.length === 0) {
    return <h3>No translations</h3>;
  }
  return (
    <div className="translationBOARD">
      {trIDs.map((trID) => {
        const tr = vocabs.translations[trID];
        return (
          <Translation
            tr={tr}
            vocabs={vocabs}
            key={trID}
            SET_trEdit={SET_trEdit}
            TOGGLE_form={TOGGLE_form}
            SET_vocabs={SET_vocabs}
          />
        );
      })}
    </div>
  );
}
