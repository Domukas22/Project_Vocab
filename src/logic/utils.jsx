//
//
//
//
import { useState } from "react";

export function PRINT_colorChoiceBtn({ UPDATE_color, optionalCLASS = "" }) {
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
    <div
      className={`button${optionalCLASS}`}
      data-type="chooseColor"
      data-open={colorChoiceOpen}
      onClick={TOGGLE_colorChoiceBox}
    >
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
export function GENERATE_id(prefix) {
  return prefix + Math.floor(100000 + Math.random() * 9000000);
}
export function GET_folderINFOS(vocabs) {
  return Object.values(vocabs.folders).map((folder) => ({ id: folder.id, title: folder.title }));
}
export function GET_storedVocabs() {
  return JSON.parse(localStorage.getItem("vocabs"));
}
export function STORE_vocabs(vocabsOBJ) {
  localStorage.setItem("vocabs", JSON.stringify(vocabsOBJ));
}
