//
//
//
//
//
import { useState, useEffect } from "react";
import { SCROLL_top } from "./general";
import PropTypes from "prop-types";

export function ChooseColorBox({ UPDATE_color, optionalCLASS }) {
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
            HANLDE_colorClick(e, 3);
          }}
        >
          <div className="colorCIRCLE"></div>
        </div>
        <div
          className="button color medium"
          onClick={(e) => {
            HANLDE_colorClick(e, 2);
          }}
        >
          <div className="colorCIRCLE"></div>
        </div>
        <div
          className="button color high"
          onClick={(e) => {
            HANLDE_colorClick(e, 1);
          }}
        >
          <div className="colorCIRCLE"></div>
        </div>
      </div>
    </div>
  );
}
export function BtnScrollTop() {
  const [showBtn, SET_showBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      SET_showBtn(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="button boardBottom scrollTOP" onClick={SCROLL_top} data-show={showBtn}>
      ↑
    </div>
  );
}

ChooseColorBox.propTypes = {
  UPDATE_color: PropTypes.func.isRequired,
  optionalCLASS: PropTypes.string,
};
ChooseColorBox.defaultProps = {
  optionalCLASS: "",
};
