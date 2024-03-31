//

import { useState } from "react";
//import PropTypes from "prop-types";

export function Nav({ TOGGLE_form, sorting, SET_sorting, SET_searchText, currLIST, SET_currLIST }) {
  const [AREfoldersOpen, SET_foldersOpen] = useState(false);
  const [ISsortOpen, SET_sortOpen] = useState(false);

  function TOGGLE_folders() {
    SET_foldersOpen((state) => !state);
  }

  function TOGGLE_sortBox() {
    SET_sortOpen((state) => !state);
  }

  return (
    <nav>
      <div className="contentWRAP">
        <div className="navBTN chooseFolder" onClick={() => TOGGLE_folders()} data-open={AREfoldersOpen}>
          {currLIST}
          <div className="navDROPDOWN">
            <div
              className="navDropdownITEM"
              key={"German"}
              data-current={currLIST === "German"}
              onClick={() => SET_currLIST("German")}
            >
              {"German"}
            </div>
            <div
              className="navDropdownITEM"
              key={"Deleted"}
              data-current={currLIST === "Deleted"}
              onClick={() => SET_currLIST("Deleted")}
            >
              {"Deleted"}
            </div>
          </div>
        </div>
        <input
          className="inputDesktop"
          type="search"
          name=""
          id=""
          placeholder="Search..."
          onChange={(e) => {
            //SET_searchText(e.target.value.toLowerCase());
            SET_searchText(e.target.value.toLowerCase());
          }}
        />
        <div className="navBTN sort" onClick={() => TOGGLE_sortBox()} data-open={ISsortOpen}>
          {sorting}
          <div className="navDROPDOWN">
            <div
              className="navDropdownITEM"
              data-current={sorting === "Shuffle"}
              onClick={() => SET_sorting("Shuffle")}
            >
              Shuffle
            </div>
            <div className="navDropdownITEM" data-current={sorting === "Color"} onClick={() => SET_sorting("Color")}>
              Color
            </div>
            <div className="navDropdownITEM" data-current={sorting === "Date"} onClick={() => SET_sorting("Date")}>
              Date
            </div>
          </div>
        </div>
        <div className="navBTN addTR" title="Add vocab" onClick={() => TOGGLE_form(true)}>
          <div className="xWRAP">
            <div className="xLINE"></div>
            <div className="xLINE second"></div>
          </div>
        </div>
      </div>
      <div className="contentWRAP mobile">
        <input
          type="search"
          name=""
          id=""
          placeholder="Search..."
          onChange={(e) => {
            SET_searchText(e.target.value.toLowerCase());
          }}
        />
      </div>
    </nav>
  );
}
