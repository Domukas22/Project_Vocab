//
//
//
//

export function GENERATE_id(prefix) {
  return prefix + Math.floor(100000 + Math.random() * 9000000);
}
export function GET_folderINFOS(vocabs) {
  return Object.values(vocabs.folders).map((folder) => ({ id: folder.id, title: folder.title }));
}
export function GET_storedVocabs() {
  return JSON.parse(localStorage.getItem("vocabs"));
}
export function STORE_vocabs(vocabsOBJ) {
  localStorage.setItem("vocabs", JSON.stringify(vocabsOBJ));
}
