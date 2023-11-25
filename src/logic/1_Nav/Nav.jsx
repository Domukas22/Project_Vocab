//
//
//
//
//
import { useState } from "react";
import PropTypes from "prop-types";

export function Nav({ currFOLDER, availFOLDERS, SET_dispFolderID, TOGGLE_form, sorting, SET_sorting, SET_searchText }) {
  const [AREfoldersOpen, SET_foldersOpen] = useState(false);
  const [ISsortOpen, SET_sortOpen] = useState(false);

  function TOGGLE_folders() {
    SET_foldersOpen((state) => !state);
  }
  function TOGGLE_filters() {
    SET_sortOpen((state) => !state);
  }

  return (
    <nav>
      <div className="contentWRAP">
        <div className="navBTN chooseFolder" onClick={() => TOGGLE_folders()} data-open={AREfoldersOpen}>
          {currFOLDER.title}
          <div className="navDROPDOWN">
            {availFOLDERS.map((folder) => {
              return (
                <div
                  className="navDropdownITEM"
                  key={folder.id}
                  data-current={folder.id === currFOLDER.id}
                  onClick={() => SET_dispFolderID(folder.id)}
                >
                  {folder.title}
                </div>
              );
            })}
          </div>
        </div>
        <input
          className="inputDesktop"
          type="search"
          name=""
          id=""
          placeholder="Search..."
          onChange={(e) => {
            SET_searchText(e.target.value.toLowerCase());
          }}
        />
        <div className="navBTN sort" onClick={() => TOGGLE_filters()} data-open={ISsortOpen}>
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
        <div className="navBTN addTR" title="Add translation" onClick={() => TOGGLE_form(true)}>
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

Nav.propTypes = {
  currFOLDER: PropTypes.object.isRequired,
  availFOLDERS: PropTypes.array.isRequired,
  SET_dispFolderID: PropTypes.func.isRequired,
  TOGGLE_form: PropTypes.func.isRequired,
  sorting: PropTypes.string.isRequired,
  SET_sorting: PropTypes.func.isRequired,
  SET_searchText: PropTypes.func.isRequired,
};
