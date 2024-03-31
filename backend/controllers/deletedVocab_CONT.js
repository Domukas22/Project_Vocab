// write  adelet fucntion

const deletedVocab_MODEL = require("../models/deletedVocab_MODEL");
const asyncHandler = require("express-async-handler");

exports.LIST_deltedVocabs = asyncHandler(async (req, res, next) => {
  const vocabs = await deletedVocab_MODEL.find({}).exec();
  res.json(vocabs);
});

exports.FIND_deletedVocab = asyncHandler(async (req, res, next) => {
  const vocab = await deletedVocab_MODEL.findById(req.params.id).exec();
  return vocab
    ? res.json(vocab)
    : res.status(404).json({ message: `Coudn't find deleted vocab with ID ${req.params.id}` });
});

exports.DELETE_deletedVocab = asyncHandler(async (req, res) => {
  const result = await deletedVocab_MODEL.findByIdAndDelete(req.params.id);
  if (result) {
    res.json({ message: "Deleted vocab removed" });
  } else {
    res.status(404).json({ message: "Delted vocab not found" });
  }
});
