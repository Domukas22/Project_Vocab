//
//
//

import { useState } from "react";

export function PRINT_nav({ currVIEW, listOPTIONS, changeVIEW }) {
  const [listOPT, SET_listOpt] = useState(false);

  function TOGGLE_listOpt() {
    SET_listOpt((state) => !state);
  }

  return (
    <nav>
      <div className="navBTN" onClick={() => TOGGLE_listOpt()}>
        {currVIEW.title}
        <div className="listChoiceWRAP" data-open={listOPT}>
          {listOPTIONS.map((opt) => {
            return (
              <div
                className="listOPTION"
                key={opt}
                data-current={opt === currVIEW.title}
                onClick={() => changeVIEW(opt)}
              >
                {opt}
              </div>
            );
          })}
        </div>
      </div>
      <div className="navBTN addTR">
        <div className="xWRAP">
          <div className="xLINE"></div>
          <div className="xLINE second"></div>
        </div>
      </div>
    </nav>
  );
}
