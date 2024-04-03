//

import { useState, useEffect, useRef } from "react";
import { ChooseColorBox } from "../4_General/Comps_general";
//import PropTypes from "prop-types";
import { REVIVE_deletedVocab, UPDATE_vocab } from "../DB";
import { emptyText_REGEX } from "../4_General/general";
import { motion, AnimatePresence } from "framer-motion";
import { func } from "prop-types";

function Vocab({
  vocab,
  TOGGLE_form,
  SET_vocabs,
  index,
  currLIST,
  SET_alertMSG,
  SET_showAlert,
  SET_displayedVOCABS,
  highlightedVocab_ID,
  reverse,
}) {
  const [isOpen, SET_isOpen] = useState(false);
  const bottomRef = useRef(null);
  const [IS_colorUpdating, SET_colorUpdating] = useState(false);
  const [IS_reviveBtnLoading, SET_reviveBtnLoading] = useState(false);

  useEffect(() => {
    if ((isOpen && bottomRef.current) || (isOpen && bottomRef.current && highlightedVocab_ID === vocab._id)) {
      bottomRef.current.style.height = `${bottomRef.current.firstChild.scrollHeight}px`;
    } else if (bottomRef.current) {
      bottomRef.current.style.height = "0px";
    }
  }, [isOpen, highlightedVocab_ID]);

  function TOGGLE_open() {
    SET_isOpen((state) => !state);
  }

  const HANDLE_vocabUpdate = (updatedVocab) => {
    // only for color change
    SET_vocabs((currentVocabs) =>
      currentVocabs.map((vocab) => (vocab._id === updatedVocab._id ? updatedVocab : vocab)),
    );
    SET_displayedVOCABS((currentVocabs) =>
      currentVocabs.map((vocab) => (vocab._id === updatedVocab._id ? updatedVocab : vocab)),
    );
    SET_alertMSG(`Updated color of "${updatedVocab.title}"`);
    SET_showAlert(true);
  };

  async function UPDATE_color(color) {
    SET_colorUpdating(true);
    try {
      const updatedVocab = await UPDATE_vocab(vocab._id, { ...vocab, priority: color });
      console.log("Vocab updated:", updatedVocab);
      HANDLE_vocabUpdate(updatedVocab);
      SET_colorUpdating(false);
    } catch (error) {
      console.error("Error updating vocab:", error);
    }
  }

  async function HANDLE_revive(vocab) {
    SET_reviveBtnLoading(true);
    try {
      await REVIVE_deletedVocab(vocab._id);
      console.log("Vocab revived:", vocab);
      SET_vocabs((currentVocabs) => currentVocabs.filter((v) => v._id !== vocab._id));
      SET_displayedVOCABS((currentVocabs) => currentVocabs.filter((v) => v._id !== vocab._id));
      SET_alertMSG(`Revived "${vocab.title}"`);
      SET_showAlert(true);
      SET_reviveBtnLoading(false);
    } catch (error) {
      console.error("Error updating vocab:", error);
    }
  }

  const RENDER_btns = () => {
    if (currLIST === "Deleted") {
      return (
        <div
          className="button revive"
          style={{ flex: 1, textAlign: "center", pointerEvents: IS_reviveBtnLoading ? "none" : "auto" }}
          onClick={() => {
            HANDLE_revive(vocab);
          }}
          data-loading={IS_reviveBtnLoading}
        >
          <p>Revive</p>
          {IS_reviveBtnLoading && <div className="btn_SPINNER"></div>}
        </div>
      );
    } else {
      return (
        <>
          <div
            className="button"
            style={{ flex: 1, textAlign: "center" }}
            onClick={() => {
              TOGGLE_form(true, vocab);
            }}
          >
            Bearbeiten
          </div>
          <div
            className="vocabColorBox_WRAP"
            data-loading={IS_colorUpdating}
            style={{ pointerEvents: IS_colorUpdating ? "none" : "auto" }}
          >
            <ChooseColorBox UPDATE_color={UPDATE_color} />
            <AnimatePresence>
              {IS_colorUpdating && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ ease: "linear", duration: 0.1 }}
                  key={"form"}
                  style={{ zIndex: 20, position: "absolute", height: "100%", width: "100%" }}
                >
                  <div className="vocabColorSpinner_WRAP">
                    <div className="btn_SPINNER"></div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="button" onClick={() => TOGGLE_open()}>
            <div className="checkWRAP">
              <div className="checkLINE"></div>
              <div className="checkLINE second"></div>
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <div
      className="vocab"
      data-color={vocab.priority}
      data-open={isOpen}
      data-highlight={vocab._id === highlightedVocab_ID}
    >
      <div className="top" onClick={TOGGLE_open}>
        <h1 className="vocab_TEXT" dangerouslySetInnerHTML={{ __html: reverse ? vocab.translation : vocab.title }}></h1>
        <p className="order_NR" style={{ marginBottom: "auto" }}>
          {index}
        </p>
      </div>
      <div className="bottom" ref={bottomRef}>
        <div className="contentWRAP" data-id={vocab.id}>
          <div
            className="vocab_TEXT tr"
            dangerouslySetInnerHTML={{ __html: reverse ? vocab.title : vocab.translation }}
          ></div>

          {emptyText_REGEX.test(vocab.explanation) && (
            <div
              className="vocab_TEXT ex"
              style={{ padding: "2rem 2.8rem" }}
              dangerouslySetInnerHTML={{ __html: vocab.explanation }}
            ></div>
          )}
          {emptyText_REGEX.test(vocab.source) && (
            <div
              className="vocab_TEXT source"
              style={{ padding: "2rem 2.8rem" }}
              dangerouslySetInnerHTML={{ __html: vocab.source }}
            ></div>
          )}
          <div className="vocabBtnWRAP">{RENDER_btns()}</div>
        </div>
      </div>
    </div>
  );
}

export function Board({
  TOGGLE_form,
  loading,
  vocabs,
  SET_vocabs,
  sorting,
  currLIST,
  SET_alertMSG,
  SET_showAlert,
  SET_displayedVOCABS,
  highlightedVocab_ID,
  reverse,
}) {
  if (loading && vocabs.length === 0) {
    return (
      <h3 className="noTR" data-loading="true">
        Loading...
      </h3>
    );
  }

  if (!vocabs || vocabs.length === 0) {
    return <h3 className="noTR">No vocabs</h3>;
  }

  return (
    <div className="vocabBOARD" data-loading={loading} data-show_order_nr={sorting === "Date"}>
      <div className="loadingOVERLAY"></div>

      {vocabs.map((vocab, index) => {
        return (
          <Vocab
            key={vocab._id}
            vocab={vocab}
            TOGGLE_form={TOGGLE_form}
            SET_vocabs={SET_vocabs}
            SET_displayedVOCABS={SET_displayedVOCABS}
            index={vocabs.length - index}
            currLIST={currLIST}
            SET_alertMSG={SET_alertMSG}
            SET_showAlert={SET_showAlert}
            highlightedVocab_ID={highlightedVocab_ID}
            reverse={reverse}
          />
        );
      })}
    </div>
  );
}

// BoardNew.propTypes = {
//   ISloading: PropTypes.bool.isRequired,
//   trIDs: PropTypes.array.isRequired,
//   vocabs: PropTypes.object.isRequired,
//   TOGGLE_form: PropTypes.func.isRequired,
//   SET_vocabs: PropTypes.func.isRequired,
//   sorting: PropTypes.string.isRequired,
//   placementOBJ: PropTypes.object.isRequired,
// };
