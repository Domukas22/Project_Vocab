//
//
//
//
import { useState, useMemo, useEffect, useRef } from "react";
import { Nav } from "./1_Nav/Nav";
import { GET_folderINFOS, GET_storedVocabs, FILTER_bySearch, SORT_trIDs, STORE_vocabs } from "./4_General/general";
import { Form } from "./3_Form/Form";
import { dummyVOCABS } from "./vocabs";
import { TranslationBoard } from "./2_Board/Board";

export default function App() {
  // console.log("|---------- PRINT APP ----------|");
  const storedVOCABS = GET_storedVocabs();
  if (!storedVOCABS) {
    STORE_vocabs(dummyVOCABS);
  }

  const [vocabs, SET_vocabs] = useState(storedVOCABS || dummyVOCABS);
  const [dispFolderID, SET_dispFolderID] = useState("german");
  const currFOLDER = vocabs.folders[dispFolderID];
  const availFOLDERS = GET_folderINFOS(vocabs);

  const [searchTEXT, SET_searchText] = useState("");
  const [sorting, SET_sorting] = useState("Random");

  const arrangedIDs = useMemo(() => {
    const sorted = SORT_trIDs(vocabs.translations, currFOLDER.translationIDs, sorting);
    if (searchTEXT !== "") {
      return FILTER_bySearch(vocabs, sorted, searchTEXT);
    }
    return sorted;
  }, [vocabs, currFOLDER.translationIDs, sorting, searchTEXT]);

  const placementOBJ = useMemo(() => {
    console.log("GET_placement");
    return vocabs.folders[dispFolderID].translationIDs
      .map((trID) => {
        return { id: trID, created: vocabs.translations[trID].created };
      })
      .sort((a, b) => a.created - b.created)
      .reduce((finalOBJ, tr, index) => {
        finalOBJ[tr.id] = index + 1;
        return finalOBJ;
      }, {});
  }, [vocabs, dispFolderID]);

  const [ISformOpen, SET_form] = useState(false);
  const [trEditID, SET_trEditID] = useState(undefined);

  function TOGGLE_form(SHOULDopen, editID = undefined) {
    SET_form(SHOULDopen);
    SET_trEditID(editID);
  }

  return (
    <>
      <Nav
        currFOLDER={{ id: currFOLDER.id, title: currFOLDER.title }}
        availFOLDERS={availFOLDERS}
        SET_dispFolderID={SET_dispFolderID}
        TOGGLE_form={TOGGLE_form}
        sorting={sorting}
        SET_sorting={SET_sorting}
        SET_searchText={SET_searchText}
      />
      <TranslationBoard
        trIDs={arrangedIDs}
        vocabs={vocabs}
        TOGGLE_form={TOGGLE_form}
        SET_vocabs={SET_vocabs}
        sorting={sorting}
        placementOBJ={placementOBJ}
      />
      <div className="button boardBottom" onClick={() => TOGGLE_form(true)}>
        + Add new
      </div>
      <Form
        ISopen={ISformOpen}
        TOGGLE_form={TOGGLE_form}
        trEditID={trEditID}
        vocabs={vocabs}
        SET_vocabs={SET_vocabs}
        dispFolderID={dispFolderID}
      />
    </>
  );
}
