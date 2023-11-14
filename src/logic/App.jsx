//
//
//
//
import { useState } from "react";
import { Nav } from "./1_Nav/Nav";
import { GET_folderINFOS, GET_storedVocabs, FILTER_bySearch, SORT_trIDs, STORE_vocabs } from "./4_General/general";
import { Form } from "./3_Form/Form";
import { dummyVOCABS } from "./vocabs";
import { TranslationBoard } from "./2_Board/Board";

export default function App() {
  const storedVOCABS = GET_storedVocabs();
  if (!storedVOCABS) {
    STORE_vocabs(dummyVOCABS);
  }

  const [vocabs, SET_vocabs] = useState(storedVOCABS || dummyVOCABS);
  console.log();
  const [ISformOpen, SET_form] = useState(false);
  const [trEditID, SET_trEdit] = useState(undefined);
  const currFOLDER = vocabs.folders[vocabs.displayed];
  const availFOLDERS = GET_folderINFOS(vocabs);

  const [searchTEXT, SET_searchText] = useState("");
  const [sorting, SET_sorting] = useState("Random");
  const [ALLOWsorting, SET_allowSorting] = useState(true);
  const [savedIdORDER, SET_savedIdORDER] = useState(currFOLDER.translationIDs);

  console.log("print");
  const trIDs = (function ARRANGE_trIDs() {
    let arrangedTrIDs = [...savedIdORDER];
    if (ALLOWsorting) {
      arrangedTrIDs = SORT_trIDs(vocabs.translations, arrangedTrIDs, sorting);
      SET_savedIdORDER(arrangedTrIDs);
      SET_allowSorting(false);
    }
    if (searchTEXT !== "") {
      arrangedTrIDs = FILTER_bySearch(vocabs.translations, arrangedTrIDs, searchTEXT);
    }
    return arrangedTrIDs;
  })();

  function CHANGE_folder(folderID) {
    SET_vocabs({ ...vocabs, displayed: folderID });
    SET_savedIdORDER(vocabs.folders[folderID].translationIDs);
    SET_allowSorting(true);
  }
  function TOGGLE_form() {
    SET_form((ISopen) => {
      if (ISopen) SET_trEdit(() => undefined);
      return !ISopen;
    });
  }

  return (
    <>
      <Nav
        currFOLDER={{ id: currFOLDER.id, title: currFOLDER.title }}
        availFOLDERS={availFOLDERS}
        CHANGE_folder={CHANGE_folder}
        TOGGLE_form={TOGGLE_form}
        sorting={sorting}
        SET_sorting={SET_sorting}
        SET_allowSorting={SET_allowSorting}
        SET_searchText={SET_searchText}
      />
      <TranslationBoard
        trIDs={trIDs}
        vocabs={vocabs}
        SET_trEdit={SET_trEdit}
        TOGGLE_form={TOGGLE_form}
        SET_vocabs={SET_vocabs}
        sorting={sorting}
      />
      <div className="button boardBottom" onClick={() => TOGGLE_form()}>
        + Add new
      </div>
      <Form
        ISopen={ISformOpen}
        TOGGLE_form={TOGGLE_form}
        vocabs={vocabs}
        SET_vocabs={SET_vocabs}
        trEditID={trEditID}
        SET_trEdit={SET_trEdit}
        SET_allowSorting={SET_allowSorting}
        SET_savedIdORDER={SET_savedIdORDER}
      />
    </>
  );
}
