//
//
//
//
import { useState } from "react";

export function PRINT_colorChoiceBtn({ UPDATE_color }) {
  const [colorChoiceOpen, setColorChoiceOpen] = useState(false);
  const TOGGLE_colorChoiceBox = () => {
    setColorChoiceOpen((c) => !c);
  };
  const HANLDE_colorClick = (e, color) => {
    e.stopPropagation();
    UPDATE_color(color);
    TOGGLE_colorChoiceBox();
  };

  return (
    <div className="button" data-type="chooseColor" data-open={colorChoiceOpen} onClick={TOGGLE_colorChoiceBox}>
      <div className="colorCIRCLE"></div>
      <div className="chooseColorWRAP">
        <div
          className="button color low"
          onClick={(e) => {
            HANLDE_colorClick(e, "low");
          }}
        >
          <div className="colorCIRCLE"></div>
        </div>
        <div
          className="button color medium"
          onClick={(e) => {
            HANLDE_colorClick(e, "medium");
          }}
        >
          <div className="colorCIRCLE"></div>
        </div>
        <div
          className="button color high"
          onClick={(e) => {
            HANLDE_colorClick(e, "high");
          }}
        >
          <div className="colorCIRCLE"></div>
        </div>
      </div>
    </div>
  );
}
export function GENERATE_id() {
  return Math.floor(10000 + Math.random() * 900000);
}
export function GET_availableLists(translations) {
  return Object.keys(translations).filter((key) => key !== "selected");
}
export function GET_storedVocabs() {
  return JSON.parse(localStorage.getItem("vocabs"));
}
export function STORE_vocabs(vocabsOBJ) {
  localStorage.setItem("vocabs", JSON.stringify(vocabsOBJ));
}
