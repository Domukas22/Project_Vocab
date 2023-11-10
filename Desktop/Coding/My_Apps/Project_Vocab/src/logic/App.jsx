//
//
//
//
import { useState } from "react";
import { PRINT_nav } from "./Nav";
import { GENERATE_id, GET_folderINFOS, GET_storedVocabs, PRINT_colorChoiceBtn, STORE_vocabs } from "./utils";
import { Form } from "./Form";
import { dummyVOCABS } from "./starter";

function Example({ text }) {
  return <li>{text}</li>;
}
function Rule({ text, children }) {
  return (
    <div className="rule">
      <h3>{text}</h3>
      <ul>{children}</ul>
    </div>
  );
}
function Translation({ color, title, translation, trID, children: rules }) {
  const [isOpen, setIsOpen] = useState(false);
  const [trCOLOR, SET_color] = useState(color);

  function TOGGLE_open() {
    setIsOpen((state) => !state);
  }

  function UPDATE_color(color) {
    SET_color(color);

    // replace localstorage os that the tree wouldnt re-render
    const storedVOCABS = GET_storedVocabs();
    console.log(storedVOCABS.translations);
    const newVOCABS = {
      ...storedVOCABS,
      translations: { ...storedVOCABS.translations, [trID]: { ...storedVOCABS.translations[trID], color } },
    };
    console.log(newVOCABS.translations);
    STORE_vocabs(newVOCABS);
  }

  return (
    <div className="translation" data-color={trCOLOR} data-open={isOpen}>
      <div className="top" onClick={() => TOGGLE_open()}>
        <h1 className="regularTEXT">{title}</h1>
      </div>
      <div className="bottom">
        <h2 className="translatedTEXT">→ {translation}</h2>
        {rules}
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
function TranslationBoard({ trCOUNT, children: translations }) {
  if (trCOUNT === 0) {
    return <h3>No translations</h3>;
  }
  return <div className="translationBOARD">{translations}</div>;
}

export default function App() {
  const storedVOCABS = GET_storedVocabs();
  console.log(storedVOCABS);
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

  const [ISformOpen, SET_form] = useState(false);
  const TOGGLE_form = () => {
    SET_form((x) => !x);
  };

  return (
    <>
      <PRINT_nav
        currFOLDER={{ id: currFOLDER.id, title: currFOLDER.title }}
        availFOLDERS={availFOLDERS}
        CHANGE_folder={CHANGE_folder}
        TOGGLE_form={TOGGLE_form}
      />
      <TranslationBoard trCOUNT={currFOLDER.translationIDs.length}>
        {currFOLDER.translationIDs.map((trID) => {
          const tr = vocabs.translations[trID];
          return (
            <Translation color={tr.color} title={tr.title} trID={tr.id} translation={tr.translation} key={tr.id}>
              {tr.ruleIDs.map((ruleID) => {
                const rule = vocabs.rules[ruleID];
                return (
                  <Rule text={rule.text} key={ruleID}>
                    {rule.exampleIDs.map((exID) => {
                      const ex = vocabs.examples[exID];
                      return <Example text={ex.text} key={ex.id} />;
                    })}
                  </Rule>
                );
              })}
            </Translation>
          );
        })}
      </TranslationBoard>
      {/*<Form ISopen={bigFormState} TOGGLE_bigForm={TOGGLE_bigForm} /> */}
    </>
  );
}
