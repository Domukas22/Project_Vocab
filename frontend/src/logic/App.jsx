//
// re write the displayed_VOCABS to use useEffect
import { useState, useEffect } from "react";

import { Form } from "./3_Form/Form";
import { Board } from "./2_Board/Board";
import { BtnScrollTop } from "./4_General/Comps_general";
import { motion, AnimatePresence } from "framer-motion";
import { Nav } from "./1_Nav/Nav";
import { LIST_vocabs } from "./DB";
import { SORT_vocabs, FILTER_vocabs } from "./4_General/general";
import { Alert } from "./4_General/Comps_general";
import ColorBtn_WRAP from "./5_colorBtn/ColorBtn_WRAP";

export default function App() {
  const [curr_LIST, SET_currLIST] = useState("German");

  const [vocabs, SET_vocabs] = useState([]);
  const [displayed_VOCABS, SET_displayedVOCABS] = useState([]);
  const [forSearch_VOCABS, SET_forSearchVocabs] = useState([]);
  const [reverse, SET_reverse] = useState(false);

  const [toEdit_VOCAB, SET_toEditVOCAB] = useState(undefined);
  const [ISformOpen, SET_form] = useState(false);
  const [showAlert, SET_showAlert] = useState(false);
  const [alertMSG, SET_alertMSG] = useState("This is an alert text");
  const [highlightedVocab_ID, SET_highlightedVocabID] = useState("");
  const [active_COLOR, SET_activeColor] = useState("2");

  const [loading, SET_loading] = useState(false);
  const [searchTEXT, SET_searchText] = useState("");
  const [sorting, SET_sorting] = useState("Shuffle");

  //////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    async function fetchVocabs() {
      SET_loading(true);
      try {
        const fetchedVocabs = await LIST_vocabs(curr_LIST);
        const initialDisplay = sortAndFilterVocabs(fetchedVocabs, sorting, searchTEXT);
        SET_vocabs(initialDisplay);
        SET_displayedVOCABS(initialDisplay);
        SET_forSearchVocabs(initialDisplay);
      } catch (error) {
        console.error("Failed to fetch vocabs:", error);
      } finally {
        SET_loading(false);
      }
    }
    fetchVocabs();
  }, [curr_LIST]);

  const sortAndFilterVocabs = (vocabs, sorting, searchText) => {
    let filtered = searchText ? FILTER_vocabs(vocabs, searchText) : vocabs;
    let sorted = SORT_vocabs(filtered, sorting);
    return sorted;
  };

  // Handlers to trigger re-sorting or re-filtering
  const handleSortChange = (newSorting) => {
    SET_loading(true); // currently not visible, because the loading is too fast and there aren't many vocabs
    SET_sorting(newSorting);
    const sortedVocabs = sortAndFilterVocabs(vocabs, newSorting, searchTEXT);
    SET_displayedVOCABS(sortedVocabs);
    SET_forSearchVocabs(sortedVocabs);
    SET_loading(false);
  };

  const handleSearchChange = (newSearchText) => {
    SET_loading(true); // currently not visible, because the loading is too fast and there aren't many vocabs
    SET_searchText(newSearchText);
    const filteredVocabs = FILTER_vocabs(forSearch_VOCABS, newSearchText);
    SET_displayedVOCABS(filteredVocabs);
    SET_loading(false);
  };

  useEffect(() => {
    if (active_COLOR === "All") return SET_displayedVOCABS(vocabs);
  }, [active_COLOR]);

  //////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        SET_showAlert(false);
      }, 5000);
    }
  }, [showAlert]);

  useEffect(() => {
    if (highlightedVocab_ID !== "") {
      setTimeout(() => {
        SET_highlightedVocabID("");
      }, 1000);
    }
  }, [showAlert]);

  function toggleForm(isOpen, vocabToEdit = {}) {
    SET_form(isOpen);
    SET_toEditVOCAB(vocabToEdit);
  }

  return (
    <>
      <Nav
        TOGGLE_form={toggleForm}
        sorting={sorting}
        currLIST={curr_LIST}
        SET_currLIST={SET_currLIST}
        handleSortChange={handleSortChange}
        handleSearchChange={handleSearchChange}
        searchTEXT={searchTEXT}
        reverse={reverse}
        SET_reverse={SET_reverse}
      />
      <ColorBtn_WRAP vocabs={vocabs} active_COLOR={active_COLOR} SET_activeColor={SET_activeColor} />
      <Board
        TOGGLE_form={toggleForm}
        vocabs={displayed_VOCABS}
        loading={loading}
        SET_vocabs={SET_vocabs}
        sorting={sorting}
        currLIST={curr_LIST}
        SET_alertMSG={SET_alertMSG}
        SET_showAlert={SET_showAlert}
        SET_displayedVOCABS={SET_displayedVOCABS}
        highlightedVocab_ID={highlightedVocab_ID}
        reverse={reverse}
      />
      <AnimatePresence>
        {ISformOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "linear", duration: 0.1 }}
            key={"form"}
            style={{ zIndex: 20, position: "absolute" }}
          >
            <Form
              ISopen={ISformOpen}
              TOGGLE_form={toggleForm}
              toEdit_VOCAB={toEdit_VOCAB}
              SET_vocabs={SET_vocabs}
              SET_displayedVOCABS={SET_displayedVOCABS}
              SET_alertMSG={SET_alertMSG}
              SET_showAlert={SET_showAlert}
              curr_LIST={curr_LIST}
              SET_toEditVOCAB={SET_toEditVOCAB}
              SET_highlightedVocabID={SET_highlightedVocabID}
            />
          </motion.div>
        )}
        {showAlert && (
          <motion.div
            key={"alert"}
            transition={{ ease: "linear", duration: 0.25 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ zIndex: 10, position: "absolute" }}
          >
            <Alert text={alertMSG} />
          </motion.div>
        )}
      </AnimatePresence>
      <BtnScrollTop />
      <div className="button boardBottom" onClick={() => toggleForm(true)}>
        + Add new
      </div>
    </>
  );
}
