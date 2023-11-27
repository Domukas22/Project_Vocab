//
//
//
//

import { useState, useEffect, useRef } from "react";
import { ChooseColorBox } from "../4_General/Comps_general";
import { STORE_vocabs } from "../4_General/general";
import { terminal } from "virtual:terminal";
import PropTypes from "prop-types";

function Example({ text }) {
  return <li className="boardTEXT ex" dangerouslySetInnerHTML={{ __html: text }}></li>;
}
function Rule({ ruleTITLE, exIDs, vocabs }) {
  return (
    <div className="rule">
      <h3 className="boardTEXT rule" dangerouslySetInnerHTML={{ __html: ruleTITLE }}></h3>
      <ul>
        {exIDs.map((exID) => {
          return <Example text={vocabs.examples[exID].text} key={exID} />;
        })}
      </ul>
    </div>
  );
}
function Translation({ tr, vocabs, TOGGLE_form, SET_vocabs, sorting, placement }) {
  const { color, title, translation, ruleIDs } = tr;
  const [isOpen, setIsOpen] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    if (isOpen && bottomRef.current) {
      bottomRef.current.style.height = `${bottomRef.current.firstChild.scrollHeight}px`;
    } else if (bottomRef.current) {
      bottomRef.current.style.height = "0px";
    }
  }, [isOpen, vocabs]);

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
      <div className="top" onClick={TOGGLE_open}>
        <h1 className="boardTEXT" dangerouslySetInnerHTML={{ __html: title }}></h1>
        {sorting === "Date" && <p style={{ marginBottom: "auto" }}>{placement}</p>}
      </div>
      <div className="bottom" ref={bottomRef}>
        <div className="contentWRAP" data-id={tr.id}>
          <div className="boardTEXT tr" dangerouslySetInnerHTML={{ __html: `-> ${translation}` }}></div>
          {ruleIDs.map((ruleID) => {
            const rule = vocabs.rules[ruleID];
            return <Rule ruleTITLE={rule.title} exIDs={rule.exampleIDs} vocabs={vocabs} key={ruleID} />;
          })}
          <div className="translationBtnWRAP">
            <div
              className="button"
              style={{ flex: 1, textAlign: "center" }}
              onClick={() => {
                // SET_trEdit(tr.id);
                TOGGLE_form(true, tr.id);
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
    </div>
  );
}

export function TranslationBoard({ ISloading, trIDs, vocabs, TOGGLE_form, SET_vocabs, sorting, placementOBJ }) {
  if (trIDs.length === 0) {
    return (
      <h3 className="noTR" data-loading={ISloading}>
        {ISloading ? "Loading" : "No translations"}
      </h3>
    );
  }
  return (
    <div className="translationBOARD" data-loading={ISloading}>
      <div className="loadingOVERLAY"></div>
      {trIDs.map((trID) => {
        const tr = vocabs.translations[trID];
        return (
          <Translation
            tr={tr}
            vocabs={vocabs}
            key={trID}
            TOGGLE_form={TOGGLE_form}
            SET_vocabs={SET_vocabs}
            sorting={sorting}
            placement={placementOBJ[trID]}
          />
        );
      })}
    </div>
  );
}

Example.propTypes = {
  text: PropTypes.string.isRequired,
};
Rule.propTypes = {
  ruleTITLE: PropTypes.string.isRequired,
  exIDs: PropTypes.array.isRequired,
  vocabs: PropTypes.object.isRequired,
};
Translation.propTypes = {
  tr: PropTypes.object.isRequired,
  vocabs: PropTypes.object.isRequired,
  TOGGLE_form: PropTypes.func.isRequired,
  SET_vocabs: PropTypes.func.isRequired,
  sorting: PropTypes.string.isRequired,
  placement: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
TranslationBoard.propTypes = {
  ISloading: PropTypes.bool.isRequired,
  trIDs: PropTypes.array.isRequired,
  vocabs: PropTypes.object.isRequired,
  TOGGLE_form: PropTypes.func.isRequired,
  SET_vocabs: PropTypes.func.isRequired,
  sorting: PropTypes.string.isRequired,
  placementOBJ: PropTypes.object.isRequired,
};
