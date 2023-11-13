//
//
//
//
//
import { useState } from "react";

export function ChooseColorBox({ UPDATE_color, optionalCLASS = "" }) {
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
