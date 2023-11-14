//
//
//
//
//
import { useState } from "react";
import { STORE_vocabs } from "../4_General/general";

export function Nav({
  currFOLDER,
  availFOLDERS,
  CHANGE_folder,
  TOGGLE_form,
  sorting,
  SET_sorting,
  SET_searchText,
  SET_allowSorting,
}) {
  const [AREfoldersOpen, SET_foldersOpen] = useState(false);
  const [ISsortOpen, SET_sortOpen] = useState(false);

  function TOGGLE_folders() {
    SET_foldersOpen((state) => !state);
  }
  function TOGGLE_filters() {
    SET_sortOpen((state) => !state);
  }
  function SORT_list(HOWtoSort) {
    SET_allowSorting(true);
    SET_sorting(HOWtoSort);
  }

  return (
    <nav>
      <div className="navBTN" onClick={() => TOGGLE_folders()}>
        {currFOLDER.title}
        <div className="navDROPDOWN" data-open={AREfoldersOpen}>
          {availFOLDERS.map((folder) => {
            return (
              <div
                className="navDropdownITEM"
                key={folder.id}
                data-current={folder.id === currFOLDER.id}
                onClick={() => CHANGE_folder(folder.id)}
              >
                {folder.title}
              </div>
            );
          })}
        </div>
      </div>
      <input
        type="search"
        name=""
        id=""
        placeholder="Search..."
        onChange={(e) => {
          SET_searchText(e.target.value.toLowerCase());
        }}
      />
      <div className="navBTN" onClick={() => TOGGLE_filters()}>
        {sorting}
        <div className="navDROPDOWN" data-open={ISsortOpen}>
          <div className="navDropdownITEM" data-current={sorting === "Random"} onClick={() => SORT_list("Random")}>
            Random
          </div>
          <div className="navDropdownITEM" data-current={sorting === "Color"} onClick={() => SORT_list("Color")}>
            Color
          </div>
          <div className="navDropdownITEM" data-current={sorting === "Date"} onClick={() => SORT_list("Date")}>
            Date
          </div>
        </div>
      </div>
      <div className="navBTN addTR" onClick={TOGGLE_form}>
        <div className="xWRAP">
          <div className="xLINE"></div>
          <div className="xLINE second"></div>
        </div>
      </div>
    </nav>
  );
}
