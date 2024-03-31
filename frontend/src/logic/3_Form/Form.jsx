//
//
//

import { useEffect, useState, useRef } from "react";
import { ChooseColorBox } from "../4_General/Comps_general";

import { UPDATE_vocab, CREATE_vocab, DELETE_vocab } from "../DB";

function Form_CONTENT({ HANDLE_inputChange, vocab }) {
  const vocab_TITLE = useRef(null);
  const vocab_TRANSLATION = useRef(null);
  const vocab_EXPLANATION = useRef(null);

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
    // insert vocab title + translation only on load, NOT on onChange/onInput
    vocab_TITLE.current.innerHTML = vocab.title;
    vocab_TRANSLATION.current.innerHTML = vocab.translation;
    vocab_EXPLANATION.current.innerHTML = vocab.explanation;
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
            ref={vocab_TITLE}
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
            ref={vocab_TRANSLATION}
          ></div>
        </div>
        <div className="inputWRAP">
          <label htmlFor="explanation">Explanation</label>
          <div
            data-type="explanation"
            className="textEdit"
            contentEditable="true"
            onInput={HANDLE_inputChange}
            ref={vocab_EXPLANATION}
          ></div>
        </div>
      </div>
    </fieldset>
  );
}

export function Form({
  ISopen,
  TOGGLE_form,
  toEdit_VOCAB,
  SET_toEditVOCAB,
  SET_vocabs,
  SET_alertMSG,
  SET_showAlert,
  curr_LIST,
}) {
  const IS_anEdit = toEdit_VOCAB._id !== undefined;

  const [form_VOCAB, SET_formVocab] = useState({
    list: curr_LIST,
    title: IS_anEdit ? toEdit_VOCAB.title : "",
    translation: IS_anEdit ? toEdit_VOCAB.translation : "",
    explanation: IS_anEdit ? toEdit_VOCAB.explanation : "",
    priority: IS_anEdit ? toEdit_VOCAB.priority : 1,
  });

  function RESET_form() {
    TOGGLE_form(false);
    SET_toEditVOCAB(undefined);
  }

  function HANDLE_inputChange(e) {
    const dataType = e.target.getAttribute("data-type");
    const textContent = e.target.innerHTML;
    SET_formVocab((prevVocab) => ({
      ...prevVocab,
      [dataType]: textContent,
    }));
  }

  function HANDLE_alert({ text }) {
    SET_alertMSG(text);
    SET_showAlert(true);
  }

  const SUBMIT_form = async (e) => {
    e.preventDefault();
    console.log("Submitting form:", form_VOCAB);
    if (IS_anEdit) {
      try {
        const updatedVocab = await UPDATE_vocab(toEdit_VOCAB._id, form_VOCAB);
        console.log("Vocab updated:", updatedVocab);
        SET_vocabs((currentVocabs) =>
          currentVocabs.map((vocab) => (vocab._id === updatedVocab._id ? updatedVocab : vocab)),
        );
        HANDLE_alert({ text: `Updated "${updatedVocab.title}"` });
        RESET_form();
      } catch (error) {
        console.error("Error updating vocab:", error);
      }
    } else {
      try {
        const createdVocab = await CREATE_vocab(form_VOCAB);
        console.log("Vocab created:", createdVocab);
        SET_vocabs((currentVocabs) => [createdVocab, ...currentVocabs]);
        HANDLE_alert({ text: `Created "${createdVocab.title}"` });
        RESET_form();
      } catch (error) {
        console.error("Error creating vocab:", error);
      }
    }
  };

  function EDIT_color(color) {
    SET_formVocab((oldVOCAB) => ({
      ...oldVOCAB,
      priority: color,
    }));
  }

  async function DELETE_one() {
    // delete the vocab that's currently being edited

    if (!IS_anEdit) return console.error("No vocab to delete");
    try {
      const deleted = await DELETE_vocab(toEdit_VOCAB._id);
      console.log("Deleted:", deleted);
      SET_vocabs((currentVocabs) => currentVocabs.filter((x) => x._id !== toEdit_VOCAB._id));
      HANDLE_alert({ text: `Deleted "${form_VOCAB.title}"` });
      RESET_form();
    } catch (error) {
      console.error("Error deleting vocab:", error);
    }
  }

  return (
    <div className="formWRAP" data-open={ISopen}>
      <form action="submit" className="bigForm" data-color={form_VOCAB.priority}>
        <div className="top">
          <div className="textWRAP">
            <h1 className="formTITLE">{IS_anEdit ? "Bearbeiten" : "Hinfügen"}</h1>
            {IS_anEdit && <p className="textEdit notEdit" dangerouslySetInnerHTML={{ __html: form_VOCAB.title }}></p>}
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
          <Form_CONTENT HANDLE_inputChange={HANDLE_inputChange} vocab={form_VOCAB} />
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
          <div
            className="button done"
            onClick={(e) => {
              SUBMIT_form(e);
            }}
          >
            {IS_anEdit ? "Speichern" : "Hinfügen"}
          </div>
        </div>
      </form>
    </div>
  );
}
