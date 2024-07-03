//
//
//

export default function ColorBtn_WRAP({ vocabs, active_COLOR, SET_activeColor }) {
  console.log(vocabs);

  const priority_COUNTS = vocabs.reduce(
    (acc, vocab) => {
      if (vocab.priority === 1) acc[1]++;
      if (vocab.priority === 2) acc[2]++;
      if (vocab.priority === 3) acc[3]++;
      return acc;
    },
    { 1: 0, 2: 0, 3: 0 },
  );

  console.log(active_COLOR);

  return (
    <div className="ColorBtn_WRAP">
      <button className="Color_BTN" data-active={active_COLOR === "All"} onClick={() => SET_activeColor("All")}>
        All - {vocabs.length}
      </button>
      <button className="Color_BTN _1" data-active={active_COLOR === "1"} onClick={() => SET_activeColor("1")}>
        1 - {priority_COUNTS[1]}
      </button>
      <button className="Color_BTN _2" data-active={active_COLOR === "2"} onClick={() => SET_activeColor("2")}>
        2 - {priority_COUNTS[2]}
      </button>
      <button className="Color_BTN _3" data-active={active_COLOR === "3"} onClick={() => SET_activeColor("3")}>
        3 - {priority_COUNTS[3]}
      </button>
    </div>
  );
}
