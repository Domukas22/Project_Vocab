//
//
//

import { useEffect, useState, useRef } from "react";
import { ChooseColorBox } from "../4_General/Comps_general";

import { FIND_vocab, UPDATE_vocab, CREATE_vocab, DELETE_vocab } from "../DB";

function Form_CONTENT({ HANDLE_inputChange, vocab }) {
  const titleTEXT = useRef(null);
  const translationTEXT = useRef(null);
  const explanation_TEXT = useRef(null);

  function paste(e) {
    e.preventDefault();
    let text = e.clipboardData ? e.clipboardData.getData("text/plain") : "";

    if (document.getSelection) {
      const selection = document.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        console.log(range);
        range.deleteContents();

        const textNode = document.createTextNode(text);
        range.insertNode(textNode);

        // Move the cursor to the end of the inserted text
        range.selectNodeContents(textNode);
        range.collapse(false); // false collapses the range to the end point
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }
  useEffect(() => {
    // insert tr title + translation only on load, NOT on onChange/onInput
    titleTEXT.current.innerHTML = vocab.title;
    translationTEXT.current.innerHTML = vocab.translation;
    explanation_TEXT.current.innerHTML = vocab.explanation;
  }, []);

  return (
    <fieldset>
      <div className="top">
        <legend>Titel / Übersetzung</legend>
        <div className="buttons"></div>
      </div>
      <div className="inputs">
        <div className="inputWRAP">
          <label htmlFor="title">Titel</label>
          <div
            className="textEdit"
            contentEditable="true"
            onInput={HANDLE_inputChange}
            data-type="title"
            ref={titleTEXT}
            onPaste={paste}
          ></div>
        </div>
        <div className="inputWRAP">
          <label htmlFor="translation">Übersetzung</label>
          <div
            data-type="translation"
            className="textEdit"
            contentEditable="true"
            onInput={HANDLE_inputChange}
            ref={translationTEXT}
          ></div>
        </div>
        <div className="inputWRAP">
          <label htmlFor="explanation">Explanation</label>
          <div
            data-type="explanation"
            className="textEdit"
            contentEditable="true"
            onInput={HANDLE_inputChange}
            ref={explanation_TEXT}
          ></div>
        </div>
      </div>
    </fieldset>
  );
}

export function Form({ ISopen, TOGGLE_form, trEditID: vocabEdit_ID, SET_vocabs }) {
  const IS_anEdit = vocabEdit_ID !== undefined;
  const [vocab, SET_vocab] = useState({
    title: "",
    translation: "",
    explanation: "",
    priority: 3,
  });
  const [loading, SET_loading] = useState(false);

  useEffect(() => {
    if (IS_anEdit) {
      const fetchVocab = async () => {
        SET_loading(true); // Start loading
        try {
          const fetchedVocab = await FIND_vocab(vocabEdit_ID);
          SET_vocab(fetchedVocab); // Update state with fetched vocab
        } catch (error) {
          console.error(`Failed to fetch vocab with id ${vocabEdit_ID}`, error);
          //SET_vocab(empty_VOCAB);
        } finally {
          SET_loading(false); // End loading
        }
      };
      fetchVocab();
    }
  }, [IS_anEdit, vocabEdit_ID]);

  if (loading) {
    return <h3 className="loading">Loading...</h3>;
  }

  if (!vocab) {
    return <h3 className="noTR">No vocabs</h3>;
  }

  function RESET_form() {
    TOGGLE_form(false);
  }

  function HANDLE_inputChange(e) {
    const dataType = e.target.getAttribute("data-type");
    const textContent = e.target.innerHTML;
    SET_vocab((prevVocab) => ({
      ...prevVocab,
      [dataType]: textContent,
    }));
  }

  const SUBMIT_form = async (event) => {
    event.preventDefault();

    if (IS_anEdit) {
      try {
        const updatedVocab = await UPDATE_vocab(vocabEdit_ID, vocab);
        console.log("Vocab updated:", updatedVocab);
        SET_vocabs((currentVocabs) =>
          currentVocabs.map((vocab) => (vocab._id === updatedVocab._id ? updatedVocab : vocab)),
        );
        RESET_form();
      } catch (error) {
        console.error("Error updating vocab:", error);
      }
    } else {
      try {
        const createdVocab = await CREATE_vocab(vocab);
        console.log("Vocab created:", createdVocab);
        SET_vocabs((currentVocabs) => [createdVocab, ...currentVocabs]);
        RESET_form();
      } catch (error) {
        console.error("Error creating vocab:", error);
      }
    }
  };

  function EDIT_color(color) {
    SET_vocab((oldVOCAB) => ({
      ...oldVOCAB,
      priority: color,
    }));
  }

  async function DELETE_one() {
    // delete the vocab that's currently being edited

    if (!IS_anEdit) return console.error("No vocab to delete");
    try {
      const deleted = await DELETE_vocab(vocab._id);
      console.log("Deleted:", deleted);
      SET_vocabs((currentVocabs) => currentVocabs.filter((x) => x._id !== vocab._id));
      RESET_form();
    } catch (error) {
      console.error("Error deleting vocab:", error);
    }
  }

  return (
    <div className="formWRAP" data-open={ISopen}>
      <form action="submit" className="bigForm" data-color={vocab.priority}>
        <div className="top">
          <div className="textWRAP">
            <h1 className="formTITLE">{IS_anEdit ? "Bearbeiten" : "Hinfügen"}</h1>
            {IS_anEdit && <p className="textEdit notEdit" dangerouslySetInnerHTML={{ __html: vocab.title }}></p>}
          </div>
          <div className="btnWRAP">
            <ChooseColorBox UPDATE_color={EDIT_color} optionalCLASS={" seeThrough"} />
            <div className="button seeThrough X" onClick={RESET_form}>
              <div className="xWRAP">
                <div className="xLINE"></div>
                <div className="xLINE second"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          <Form_CONTENT HANDLE_inputChange={HANDLE_inputChange} vocab={vocab} />
        </div>
        <div className="formEndBtnWRAP">
          {IS_anEdit && (
            <div className="button delete" onClick={() => DELETE_one()}>
              Delete
            </div>
          )}
          <div className="button cancel" onClick={RESET_form}>
            Abbrechen
          </div>
          <div className="button done" onClick={(e) => SUBMIT_form(e)}>
            {IS_anEdit ? "Speichern" : "Hinfügen"}
          </div>
        </div>
      </form>
    </div>
  );
}
