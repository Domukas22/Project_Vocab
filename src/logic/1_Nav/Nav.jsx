//
//
//
//
//
import { useState } from "react";

export function PRINT_nav({ currFOLDER, availFOLDERS, CHANGE_folder, TOGGLE_form }) {
  const [AREfoldersOpen, SET_foldersOpen] = useState(false);

  function TOGGLE_listOpt() {
    SET_foldersOpen((state) => !state);
  }

  return (
    <nav>
      <div className="navBTN" onClick={() => TOGGLE_listOpt()}>
        {currFOLDER.title}
        <div className="navFoldersWRAP" data-open={AREfoldersOpen}>
          {availFOLDERS.map((folder) => {
            return (
              <div
                className="navFOLDER"
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
      <div className="navBTN addTR" onClick={TOGGLE_form}>
        <div className="xWRAP">
          <div className="xLINE"></div>
          <div className="xLINE second"></div>
        </div>
      </div>
    </nav>
  );
}
