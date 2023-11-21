//
//
//
//

import { useState } from "react";

const App = () => {
  const [heading, setHeading] = useState("Magnificent Monkeys");
  const [trigger, setTrigger] = useState(false);

  const clickHandler = () => {
    setHeading("Radical Rhinos");
    setTrigger(true);
  };

  return (
    <>
      <button type="button" onClick={clickHandler}>
        Click Me
      </button>
      {trigger && <p>Eyo</p>}
      <h1>{heading}</h1>
    </>
  );
};

export default App;
