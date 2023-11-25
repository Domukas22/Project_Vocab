//
//
//
//
import { useState, useMemo, useEffect } from "react";
import { Nav } from "./1_Nav/Nav";
import {
  GET_folderINFOS,
  GET_storedVocabs,
  STORE_vocabs,
  SORT_trIDs,
  FILTER_bySearch,
  GET_trPlacement,
} from "./4_General/general";
import { Form } from "./3_Form/Form";
import { dummyVOCABS } from "./vocabs";
import { TranslationBoard } from "./2_Board/Board";
import { BTNscrollTop } from "./4_General/Comps_general";

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
  const [sorting, SET_sorting] = useState("Shuffle");

  const [loading, SET_loading] = useState(false);
  const [asyncSortedIDs, SET_asyncSortedIDs] = useState([]);
  const [asyncArrangedIDs, SET_asyncArrangedIDs] = useState([]);

  useEffect(() => {
    // sort trs
    let isCancelled = false;
    SET_loading(true);

    (async () => {
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      if (isCancelled) return;
      const newSortedIDs = SORT_trIDs(vocabs.translations, currFOLDER.translationIDs, sorting);
      SET_asyncSortedIDs(newSortedIDs);
    })();

    return () => {
      isCancelled = true;
    };
  }, [sorting, currFOLDER.title]);

  useEffect(() => {
    // filer trs
    let isCancelled = false;
    if (!loading) SET_loading(true);

    (async () => {
      let newArrangedIDs = asyncSortedIDs;
      if (searchTEXT !== "") {
        // await new Promise((resolve) => setTimeout(resolve, 1000));
        if (isCancelled) return;
        newArrangedIDs = FILTER_bySearch(vocabs, asyncSortedIDs, searchTEXT);
      }
      SET_asyncArrangedIDs(newArrangedIDs);
      SET_loading(false);
    })();

    return () => {
      isCancelled = true;
    };
  }, [asyncSortedIDs, searchTEXT]);

  const placementOBJ = useMemo(() => {
    return GET_trPlacement(vocabs.translations, currFOLDER);
  }, [vocabs.translations, currFOLDER]);

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
        trIDs={asyncArrangedIDs}
        vocabs={vocabs}
        TOGGLE_form={TOGGLE_form}
        SET_vocabs={SET_vocabs}
        sorting={sorting}
        placementOBJ={placementOBJ}
        ISloading={loading}
      />
      {ISformOpen && (
        <Form
          ISopen={ISformOpen}
          TOGGLE_form={TOGGLE_form}
          trEditID={trEditID}
          vocabs={vocabs}
          SET_vocabs={SET_vocabs}
          dispFolderID={dispFolderID}
        />
      )}
      <BTNscrollTop />
      <div className="button boardBottom" onClick={() => TOGGLE_form(true)}>
        + Add new
      </div>
    </>
  );
}
