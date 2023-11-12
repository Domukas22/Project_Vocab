//
//
//
//
import { useEffect, useState } from "react";
import { PRINT_nav } from "./Nav";
import { GET_folderINFOS, GET_storedVocabs, PRINT_colorChoiceBtn, STORE_vocabs } from "./utils";
import { Form } from "./Form";
import { dummyVOCABS } from "./starter";
import { terminal } from "virtual:terminal";

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
        <h1 className="regularTEXT">{title}</h1>
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
          <PRINT_colorChoiceBtn UPDATE_color={UPDATE_color} />
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
function TranslationBoard({ trIDs, vocabs, SET_trEdit, TOGGLE_form, SET_vocabs }) {
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

export default function App() {
  const storedVOCABS = GET_storedVocabs();
  if (!storedVOCABS) {
    STORE_vocabs(dummyVOCABS);
  }

  const [vocabs, SET_vocabs] = useState(storedVOCABS || dummyVOCABS);

  const currFOLDER = vocabs.folders[vocabs.displayed];
  const availFOLDERS = GET_folderINFOS(vocabs);

  function CHANGE_folder(folderID) {
    // display changes saved to localstorage
    SET_vocabs({ ...GET_storedVocabs(), displayed: folderID });
  }

  function DELETE_tr(trID) {
    console.log("Delete" + trID);
    const ruleIDs = vocabs.translations[trID].ruleIDs;
    const exIDs = ruleIDs.reduce((arr, ruleID) => {
      for (let exID of vocabs.rules[ruleID].exampleIDs) {
        arr.push(exID);
      }
      return arr;
    }, []);
    console.log(exIDs);
    const newVOCABS = {
      ...vocabs,
      folders: {
        ...vocabs.folders,
        [vocabs.displayed]: {
          ...vocabs.folders[vocabs.displayed],
          translationIDs: [...vocabs.folders[vocabs.displayed].translationIDs].filter((tID) => tID !== trID),
        },
      },
      translations: Object.fromEntries(Object.entries(vocabs.translations).filter(([tID, _]) => tID !== trID)),
      rules: Object.fromEntries(Object.entries(vocabs.rules).filter(([rID, _]) => !ruleIDs.includes(rID))),
      examples: Object.fromEntries(Object.entries(vocabs.examples).filter(([eID, _]) => !exIDs.includes(eID))),
    };
    SET_vocabs(newVOCABS);
    STORE_vocabs(newVOCABS);
    TOGGLE_form();
  }

  // should the form edit or add
  const [ISformOpen, SET_form] = useState(true);
  const [trEditID, SET_trEdit] = useState(undefined);
  function TOGGLE_form() {
    SET_form((ISopen) => {
      if (ISopen) SET_trEdit(() => undefined);
      return !ISopen;
    });
  }

  return (
    <>
      <PRINT_nav
        currFOLDER={{ id: currFOLDER.id, title: currFOLDER.title }}
        availFOLDERS={availFOLDERS}
        CHANGE_folder={CHANGE_folder}
        TOGGLE_form={TOGGLE_form}
      />
      <TranslationBoard
        trIDs={currFOLDER.translationIDs}
        vocabs={vocabs}
        SET_trEdit={SET_trEdit}
        TOGGLE_form={TOGGLE_form}
        SET_vocabs={SET_vocabs}
      />
      <div
        className="button"
        onClick={() => {
          localStorage.clear();
          location.reload();
        }}
      >
        Reset
      </div>
      <Form
        ISopen={ISformOpen}
        TOGGLE_form={TOGGLE_form}
        vocabs={vocabs}
        SET_vocabs={SET_vocabs}
        trEditID={trEditID}
        SET_trEdit={SET_trEdit}
        DELETE_tr={DELETE_tr}
      />
    </>
  );
}
