//

import { useState, useEffect, useRef } from "react";
import { ChooseColorBox } from "../4_General/Comps_general";
//import PropTypes from "prop-types";
import { UPDATE_vocab } from "../DB";

function Vocab({ vocab, TOGGLE_form, HANDLE_vocabUpdate }) {
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

  async function UPDATE_color(color) {
    try {
      const updatedVocab = await UPDATE_vocab(vocab._id, { ...vocab, priority: color });
      console.log("Vocab updated:", updatedVocab);
      HANDLE_vocabUpdate(updatedVocab);
    } catch (error) {
      console.error("Error updating vocab:", error);
    }
  }

  return (
    <div className="translation" data-color={vocab.priority} data-open={isOpen}>
      <div className="top" onClick={TOGGLE_open}>
        <h1 className="boardTEXT" dangerouslySetInnerHTML={{ __html: vocab.title }}></h1>
        {/*sorting === "Date" && <p style={{ marginBottom: "auto" }}>{placement}</p>*/}
      </div>
      <div className="bottom" ref={bottomRef}>
        <div className="contentWRAP" data-id={vocab.id}>
          <div className="boardTEXT tr" dangerouslySetInnerHTML={{ __html: vocab.translation }}></div>
          <div
            className="boardTEXT"
            style={{ padding: "2rem 2.8rem" }}
            dangerouslySetInnerHTML={{ __html: vocab.explanation }}
          ></div>
          <div className="translationBtnWRAP">
            <div
              className="button"
              style={{ flex: 1, textAlign: "center" }}
              onClick={() => {
                // SET_trEdit(tr.id);
                TOGGLE_form(true, vocab._id);
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
          </div>
        </div>
      </div>
    </div>
  );
}

export function Board({ TOGGLE_form, loading, vocabs, SET_vocabs }) {
  const HANDLE_vocabUpdate = (updatedVocab) => {
    SET_vocabs((currentVocabs) =>
      currentVocabs.map((vocab) => (vocab._id === updatedVocab._id ? updatedVocab : vocab)),
    );
  };

  console.log(vocabs);

  if (loading) {
    return <h3 className="loading">Loading...</h3>;
  }

  if (!vocabs || vocabs.length === 0) {
    return <h3 className="noTR">No translations</h3>;
  }

  return (
    <div className="translationBOARD" data-loading={loading}>
      <div className="loadingOVERLAY"></div>
      {vocabs.map((vocab) => {
        return (
          <Vocab key={vocab._id} vocab={vocab} TOGGLE_form={TOGGLE_form} HANDLE_vocabUpdate={HANDLE_vocabUpdate} />
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
