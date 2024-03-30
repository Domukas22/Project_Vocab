//
//
import { useState, useEffect, useMemo } from "react";

import { Form } from "./3_Form/FormNew";
import { BoardNew } from "./2_Board/BoardNew";
import { BTNscrollTop } from "./4_General/Comps_general";
import { motion, AnimatePresence } from "framer-motion";
import { NavNew } from "./1_Nav/NavNew";
import { LIST_vocabs } from "./DB";
import { SORT_vocabs, FILTER_vocabs } from "./4_General/general";

export default function App() {
  const [searchTEXT, SET_searchText] = useState("");
  const [sorting, SET_sorting] = useState("Shuffle");

  const [ISformOpen, SET_form] = useState(false);
  const [trEditID, SET_trEditID] = useState(undefined);

  const [vocabs, SET_vocabs] = useState([]);
  const [loading, SET_loading] = useState(false);

  function TOGGLE_form(SHOULDopen, editID = undefined) {
    SET_form(SHOULDopen);
    SET_trEditID(editID);
  }

  useEffect(() => {
    const fetchVocabs = async () => {
      SET_loading(true);
      try {
        const fetchedVocabs = await LIST_vocabs();
        SET_vocabs(fetchedVocabs);
      } catch (error) {
        console.error("Failed to fetch vocabs", error);
      } finally {
        SET_loading(false);
      }
    };

    fetchVocabs();
  }, []);

  const arranged_VOCABS = useMemo(() => {
    let result = [...vocabs]; // Start with a copy of the original vocabs array

    // First, filter the vocabs if there's search text
    if (searchTEXT) {
      result = FILTER_vocabs(result, searchTEXT);
    }

    // Then, sort the filtered results
    result = SORT_vocabs(result, sorting);

    return result;
  }, [vocabs, searchTEXT, sorting]);

  return (
    <>
      <NavNew TOGGLE_form={TOGGLE_form} sorting={sorting} SET_sorting={SET_sorting} SET_searchText={SET_searchText} />
      <BoardNew TOGGLE_form={TOGGLE_form} vocabs={arranged_VOCABS} loading={loading} SET_vocabs={SET_vocabs} />

      <AnimatePresence>
        {ISformOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "linear", duration: 0.1 }}
            style={{ zIndex: 10 }}
          >
            <Form ISopen={ISformOpen} TOGGLE_form={TOGGLE_form} trEditID={trEditID} SET_vocabs={SET_vocabs} />
          </motion.div>
        )}
      </AnimatePresence>
      <BTNscrollTop />
      <div className="button boardBottom" onClick={() => TOGGLE_form(true)}>
        + Add new
      </div>
    </>
  );
}
