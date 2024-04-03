//

import { func } from "prop-types";
import { useState, useRef } from "react";
// create a toggle which will toggle the SET_reverse function to true and false

export function Nav({
  TOGGLE_form,
  sorting,
  currLIST,
  SET_currLIST,
  handleSortChange,
  handleSearchChange,
  searchTEXT,
  reverse,
  SET_reverse,
}) {
  const [AREfoldersOpen, SET_foldersOpen] = useState(false);
  const [ISsortOpen, SET_sortOpen] = useState(false);

  function TOGGLE_folders() {
    SET_foldersOpen((state) => !state);
  }

  function TOGGLE_sortBox() {
    SET_sortOpen((state) => !state);
  }

  const desktopSearch_BAR = useRef(null);
  const mobileSearch_BAR = useRef(null);

  function CLEAR_inputs() {
    handleSearchChange("");
    desktopSearch_BAR.current.value = "";
    mobileSearch_BAR.current.value = "";
  }

  return (
    <nav>
      <div className="contentWRAP" style={{ zIndex: "10" }}>
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
        <div className="search_WRAP desktop">
          <input
            className="inputDesktop"
            type="search"
            ref={desktopSearch_BAR}
            name=""
            id=""
            placeholder="Search..."
            onChange={(e) => {
              handleSearchChange(e.target.value.toLowerCase());
              mobileSearch_BAR.current.value = e.target.value;
            }}
          />
          {searchTEXT !== "" && (
            <div
              className="button seeThrough X"
              onClick={() => {
                CLEAR_inputs();
              }}
            >
              <div className="xWRAP">
                <div className="xLINE"></div>
                <div className="xLINE second"></div>
              </div>
            </div>
          )}
        </div>
        <div className="navBTN sort" onClick={() => TOGGLE_sortBox()} data-open={ISsortOpen}>
          {sorting}
          <div className="navDROPDOWN">
            <div
              className="navDropdownITEM"
              data-current={sorting === "Shuffle"}
              onClick={() => handleSortChange("Shuffle")}
            >
              Shuffle
            </div>
            <div
              className="navDropdownITEM"
              data-current={sorting === "Color"}
              onClick={() => handleSortChange("Color")}
            >
              Color
            </div>
            <div className="navDropdownITEM" data-current={sorting === "Date"} onClick={() => handleSortChange("Date")}>
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
      <div className="contentWRAP">
        <div
          className="navBTN display_TOGGLE"
          onClick={() => {
            SET_reverse(false);
          }}
          data-active={reverse === false}
        >
          Title
        </div>
        <div
          className="navBTN display_TOGGLE"
          onClick={() => {
            SET_reverse(true);
          }}
          data-active={reverse === true}
        >
          Traslation
        </div>
      </div>
      <div className="search_WRAP mobile">
        <input
          type="search"
          ref={mobileSearch_BAR}
          name=""
          id=""
          placeholder="Search..."
          onChange={(e) => {
            handleSearchChange(e.target.value.toLowerCase());
            desktopSearch_BAR.current.value = e.target.value;
          }}
        />
        {searchTEXT !== "" && (
          <div
            className="button seeThrough X"
            onClick={() => {
              CLEAR_inputs();
            }}
          >
            <div className="xWRAP">
              <div className="xLINE"></div>
              <div className="xLINE second"></div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
