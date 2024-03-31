//

const express = require("express");
const router = express.Router();

const vocab_CONT = require("../controllers/vocab_CONT");
const deletedVocab_CONT = require("../controllers/deletedVocab_CONT");

router.get("/", vocab_CONT.LIST_vocabs);
router.get("/deleted", deletedVocab_CONT.LIST_deletedVocabs);
router.delete("/deleted/revive/:id", deletedVocab_CONT.REVIVE_deletedVocab);

router.get("/:id", vocab_CONT.FIND_vocab);
router.post("/", vocab_CONT.CREATE_vocab);
router.put("/:id", vocab_CONT.UPDATE_vocab);
router.delete("/:id", vocab_CONT.DELETE_vocab);

module.exports = router;
