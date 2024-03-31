// similar to the function at vocab_CONT.js, create a revive function which remove sthe vocab from the deletedVocab collection and adds it to the vocab collection

const deletedVocab_MODEL = require("../models/deletedVocab_MODEL");
const vocab_MODEL = require("../models/vocab_MODEL");
const asyncHandler = require("express-async-handler");

exports.LIST_deletedVocabs = asyncHandler(async (req, res, next) => {
  //console.log("GET DELETED");
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

exports.REVIVE_deletedVocab = asyncHandler(async (req, res) => {
  const deletedVocab = await deletedVocab_MODEL.findById(req.params.id).exec();
  if (deletedVocab) {
    const { list, title, translation, explanation, priority } = deletedVocab;
    const vocab = new vocab_MODEL({ list, title, translation, explanation, priority });
    await vocab.save();
    await deletedVocab_MODEL.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted vocab revived" });
  } else {
    res.status(404).json({ message: "Deleted vocab not found" });
  }
});
