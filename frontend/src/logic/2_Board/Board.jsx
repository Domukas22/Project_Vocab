//

import { useState, useEffect, useRef } from "react";
import { ChooseColorBox } from "../4_General/Comps_general";
//import PropTypes from "prop-types";
import { REVIVE_deletedVocab, UPDATE_vocab } from "../DB";

function Vocab({ vocab, TOGGLE_form, SET_vocabs, index, currLIST, SET_alertMSG, SET_showAlert, SET_displayedVOCABS }) {
  const [isOpen, SET_isOpen] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    if (isOpen && bottomRef.current) {
      bottomRef.current.style.height = `${bottomRef.current.firstChild.scrollHeight}px`;
    } else if (bottomRef.current) {
      bottomRef.current.style.height = "0px";
    }
  }, [isOpen]);

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
    SET_alertMSG(`Updated "${updatedVocab.title}"`);
    SET_showAlert(true);
  };

  async function UPDATE_color(color) {
    try {
      const updatedVocab = await UPDATE_vocab(vocab._id, { ...vocab, priority: color });
      console.log("Vocab updated:", updatedVocab);

      HANDLE_vocabUpdate(updatedVocab);
    } catch (error) {
      console.error("Error updating vocab:", error);
    }
  }

  async function HANDLE_revive(vocab) {
    try {
      await REVIVE_deletedVocab(vocab._id);
      console.log("Vocab revived:", vocab);
      SET_vocabs((currentVocabs) => currentVocabs.filter((v) => v._id !== vocab._id));
      SET_displayedVOCABS((currentVocabs) => currentVocabs.filter((v) => v._id !== vocab._id));
      SET_alertMSG(`Revived "${vocab.title}"`);
      SET_showAlert(true);
    } catch (error) {
      console.error("Error updating vocab:", error);
    }
  }

  const RENDER_btns = () => {
    if (currLIST === "Deleted") {
      return (
        <div
          className="button"
          style={{ flex: 1, textAlign: "center" }}
          onClick={() => {
            HANDLE_revive(vocab);
          }}
        >
          Revive
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
          <ChooseColorBox UPDATE_color={UPDATE_color} />
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
    <div className="vocab" data-color={vocab.priority} data-open={isOpen}>
      <div className="top" onClick={TOGGLE_open}>
        <h1 className="vocab_TEXT" dangerouslySetInnerHTML={{ __html: vocab.title }}></h1>
        <p className="order_NR" style={{ marginBottom: "auto" }}>
          {index}
        </p>
      </div>
      <div className="bottom" ref={bottomRef}>
        <div className="contentWRAP" data-id={vocab.id}>
          <div className="vocab_TEXT tr" dangerouslySetInnerHTML={{ __html: vocab.translation }}></div>

          {vocab.explanation && (
            <div
              className="vocab_TEXT ex"
              style={{ padding: "2rem 2.8rem" }}
              dangerouslySetInnerHTML={{ __html: vocab.explanation }}
            ></div>
          )}
          {vocab.source && (
            <div
              className="vocab_TEXT ex"
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
}) {
  if (loading) {
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
