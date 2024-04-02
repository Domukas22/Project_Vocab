//
//
//
//

export function SCROLL_top() {
  window.scrollTo({
    top: -100,
    left: 0,
    behavior: "smooth",
  });
}

export function SORT_vocabs(vocabs, sorting) {
  let sortedVocabs = [...vocabs]; // Create a shallow copy to avoid mutating the original array

  if (sorting === "Shuffle") {
    // Shuffle using the Fisher-Yates algorithm
    for (let i = sortedVocabs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [sortedVocabs[i], sortedVocabs[j]] = [sortedVocabs[j], sortedVocabs[i]];
    }
  } else if (sorting === "Color") {
    // Assuming 'priority' can be "1", "2", "3"
    sortedVocabs.sort((a, b) => {
      const priorities = { 1: 1, 2: 2, 3: 3 };
      return priorities[a.priority] - priorities[b.priority];
    });
  } else if (sorting === "Date") {
    sortedVocabs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    console.log(sortedVocabs);
  }

  return sortedVocabs;
}
export function FILTER_vocabs(vocabs, searchText) {
  if (!searchText.trim()) return vocabs; // Return all vocabs if searchText is empty or only whitespace

  const lowerCaseSearchText = searchText.toLowerCase();

  return vocabs.filter(
    (vocab) =>
      vocab.title.toLowerCase().includes(lowerCaseSearchText) ||
      vocab.translation.toLowerCase().includes(lowerCaseSearchText) ||
      vocab.explanation.toLowerCase().includes(lowerCaseSearchText) ||
      vocab.source.toLowerCase().includes(lowerCaseSearchText),
  );
}

export const emptyText_REGEX = /^(?! *$)(?!&nbsp;$).+/;
// 1. ""
// 2. " "
// 3. &nbsp
