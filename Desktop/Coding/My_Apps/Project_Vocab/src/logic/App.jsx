//
//
//
//
import { useState } from "react";
import { PRINT_nav } from "./Nav";
import { GENERATE_id, GET_availableLists, GET_storedVocabs, PRINT_colorChoiceBtn, STORE_vocabs } from "./utils";
import { Form } from "./Form";
import { dummyVOCABS } from "./starter";

function Rule({ ruleID, ruleOBJS, exampleOBJS }) {
  return (
    <div className="rule">
      <h3>{ruleOBJS[ruleID].title}</h3>
      <ul>
        {ruleOBJS[ruleID].exampleIDs.map((exID) => {
          return <li key={exID}>{exampleOBJS[exID].text}</li>;
        })}
      </ul>
    </div>
  );
}
function Translation({ tr, rules, examples }) {
  const [isOpen, setIsOpen] = useState(false);
  const [color, SET_color] = useState(tr.color);

  function TOGGLE_open() {
    setIsOpen((state) => !state);
  }

  function UPDATE_color(color) {
    SET_color(color);

    // replace localstorage os that the tree wouldnt re-render
    const storedVOCABS = GET_storedVocabs();
    const selLIST = storedVOCABS[storedVOCABS.selected];
    const newVOCABS = {
      ...storedVOCABS,
      [storedVOCABS.selected]: {
        ...selLIST,
        translations: {
          ...selLIST.translations,
          [tr.id]: {
            ...selLIST.translations[tr.id],
            color: color,
          },
        },
      },
    };
    STORE_vocabs(newVOCABS);
  }

  return (
    <div className="translation" key={tr.id} data-color={color} data-open={isOpen}>
      <div className="top" onClick={() => TOGGLE_open()}>
        <h1 className="regularTEXT">{tr.title}</h1>
      </div>
      <div className="bottom">
        <h2 className="translatedTEXT">→ {tr.translation}</h2>
        {tr.ruleIDs.map((ruleID) => (
          <Rule ruleID={ruleID} ruleOBJS={rules} exampleOBJS={examples} key={ruleID} />
        ))}
        <div className="translationBtnWRAP">
          <div className="button" style={{ flex: 1, textAlign: "center" }}>
            Bearbeiten
          </div>
          <PRINT_colorChoiceBtn UPDATE_color={UPDATE_color} />
          <div className="button" onClick={() => TOGGLE_open()}>
            ✓
          </div>
        </div>
      </div>
    </div>
  );
}
function TranslationBoard({ currVIEW }) {
  if (Object.values(currVIEW.translations).length === 0) {
    return <h3>No translations</h3>;
  }
  return (
    <div className="translationBOARD">
      {Object.values(currVIEW.translations).map((tr) => {
        return <Translation tr={tr} rules={currVIEW.rules} examples={currVIEW.examples} key={GENERATE_id()} />;
      })}
    </div>
  );
}

export default function App() {
  const [bigFormState, setBigFormState] = useState(true);
  const TOGGLE_bigForm = () => {
    setBigFormState((x) => !x);
  };
  const storedVOCABS = GET_storedVocabs();
  if (!storedVOCABS) {
    STORE_vocabs(dummyVOCABS);
  }

  const [vocabs, SET_vocabs] = useState(storedVOCABS);
  const currVIEW = vocabs[vocabs.selected];

  function changeVIEW(name) {
    // display changes saved to localstorage
    SET_vocabs({ ...GET_storedVocabs(), selected: name });
  }

  return (
    <>
      <PRINT_nav
        currVIEW={currVIEW}
        listOPTIONS={GET_availableLists(vocabs)}
        changeVIEW={changeVIEW}
        TOGGLE_bigForm={TOGGLE_bigForm}
      />
      <TranslationBoard currVIEW={currVIEW} />
      <Form ISopen={bigFormState} TOGGLE_bigForm={TOGGLE_bigForm} />
    </>
  );
}
