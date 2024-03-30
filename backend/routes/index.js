//

const express = require("express");
const router = express.Router();

const germanVocab_CONT = require("../controllers/germanVocab_CONT");

router.get("/", germanVocab_CONT.LIST_germanVocabs);
router.get("/:id", germanVocab_CONT.FIND_germanVocab);
router.post("/", germanVocab_CONT.CREATE_germanVocab);
router.put("/:id", germanVocab_CONT.UPDATE_germanVocab);
router.delete("/:id", germanVocab_CONT.DELETE_germanVocab);

module.exports = router;
