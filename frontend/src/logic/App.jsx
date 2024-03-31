//
//
import { useState, useEffect, useMemo } from "react";

import { Form } from "./3_Form/Form";
import { Board } from "./2_Board/Board";
import { BtnScrollTop } from "./4_General/Comps_general";
import { motion, AnimatePresence } from "framer-motion";
import { Nav } from "./1_Nav/Nav";
import { LIST_vocabs } from "./DB";
import { SORT_vocabs, FILTER_vocabs } from "./4_General/general";
import { Alert } from "./4_General/Comps_general";
import { use } from "chai";

export default function App() {
  const [searchTEXT, SET_searchText] = useState("");
  const [sorting, SET_sorting] = useState("Shuffle");

  const [ISformOpen, SET_form] = useState(false);
  const [trEditID, SET_trEditID] = useState(undefined);

  const [vocabs, SET_vocabs] = useState([]);
  const [loading, SET_loading] = useState(false);

  const [showAlert, SET_showAlert] = useState(true);
  const [alertMSG, SET_alertMSG] = useState("This is an alert text");

  const [currLIST, SET_currLIST] = useState("German");

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

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        SET_showAlert(false);
      }, 5000);
    }
  }, [showAlert]);

  const arranged_VOCABS = useMemo(() => {
    let result = [...vocabs].filter((v) => v.list === currLIST);

    if (searchTEXT) {
      result = FILTER_vocabs(result, searchTEXT);
    }

    result = SORT_vocabs(result, sorting);

    return result;
  }, [vocabs, searchTEXT, sorting, currLIST]);

  return (
    <>
      <Nav TOGGLE_form={TOGGLE_form} sorting={sorting} SET_sorting={SET_sorting} SET_searchText={SET_searchText} />
      <Board
        TOGGLE_form={TOGGLE_form}
        vocabs={arranged_VOCABS}
        loading={loading}
        SET_vocabs={SET_vocabs}
        sorting={sorting}
      />

      <AnimatePresence>
        {ISformOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "linear", duration: 0.1 }}
            style={{ zIndex: 20, position: "absolute" }}
          >
            <Form
              ISopen={ISformOpen}
              TOGGLE_form={TOGGLE_form}
              trEditID={trEditID}
              SET_vocabs={SET_vocabs}
              SET_alertMSG={SET_alertMSG}
              SET_showAlert={SET_showAlert}
              currLIST={currLIST}
            />
          </motion.div>
        )}
        {showAlert && (
          <motion.div
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
      <AnimatePresence></AnimatePresence>
      <BtnScrollTop />

      <div className="button boardBottom" onClick={() => TOGGLE_form(true)}>
        + Add new
      </div>
    </>
  );
}
