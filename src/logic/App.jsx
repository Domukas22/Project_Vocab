//
//
//
//
import { useState } from "react";
import { PRINT_nav } from "./1_Nav/Nav";
import { GET_folderINFOS, GET_storedVocabs, STORE_vocabs } from "./4_General/general";
import { Form } from "./3_Form/Form";
import { dummyVOCABS } from "./vocabs";
import { terminal } from "virtual:terminal";
import { TranslationBoard } from "./2_Board/Board";

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
  const [ISformOpen, SET_form] = useState(false);
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
