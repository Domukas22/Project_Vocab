//
// re write the displayed_VOCABS to use useEffect
import { useState, useEffect, useCallback } from "react";

import { Form } from "./3_Form/Form";
import { Board } from "./2_Board/Board";
import { BtnScrollTop } from "./4_General/Comps_general";
import { motion, AnimatePresence } from "framer-motion";
import { Nav } from "./1_Nav/Nav";
import { LIST_vocabs } from "./DB";
import { SORT_vocabs, FILTER_vocabs } from "./4_General/general";
import { Alert } from "./4_General/Comps_general";

export default function App() {
  const [curr_LIST, SET_currLIST] = useState("German");
  const [vocabs, SET_vocabs] = useState([]);

  const [toEdit_VOCAB, SET_toEditVOCAB] = useState(undefined);
  const [ISformOpen, SET_form] = useState(false);
  const [showAlert, SET_showAlert] = useState(false);
  const [alertMSG, SET_alertMSG] = useState("This is an alert text");

  const [loading, SET_loading] = useState(false);
  const [searchTEXT, SET_searchText] = useState("");
  const [sorting, SET_sorting] = useState("Shuffle");

  //////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    async function fetchVocabs() {
      SET_loading(true);
      try {
        const fetchedVocabs = await LIST_vocabs(curr_LIST);
        // Apply initial sorting or filtering as needed or just set fetched vocabs
        const initialDisplay = sortAndFilterVocabs(fetchedVocabs, sorting, searchTEXT);
        SET_vocabs(initialDisplay);
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
    SET_sorting(newSorting);
    // Apply sorting directly
    const sortedVocabs = sortAndFilterVocabs(vocabs, newSorting, searchTEXT);
    SET_vocabs(sortedVocabs);
  };

  const handleSearchChange = (newSearchText) => {
    SET_searchText(newSearchText);
    // Apply filtering directly
    const filteredVocabs = sortAndFilterVocabs(vocabs, sorting, newSearchText);
    SET_vocabs(filteredVocabs);
  };

  //////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        SET_showAlert(false);
      }, 5000);
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
        SET_searchText={SET_searchText}
        SET_sorting={SET_sorting}
        handleSortChange={handleSortChange}
        handleSearchChange={handleSearchChange}
      />
      <Board
        TOGGLE_form={toggleForm}
        vocabs={vocabs}
        loading={loading}
        SET_vocabs={SET_vocabs}
        sorting={sorting}
        currLIST={curr_LIST}
        SET_alertMSG={SET_alertMSG}
        SET_showAlert={SET_showAlert}
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
              SET_alertMSG={SET_alertMSG}
              SET_showAlert={SET_showAlert}
              curr_LIST={curr_LIST}
              SET_toEditVOCAB={SET_toEditVOCAB}
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
