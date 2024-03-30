// write  adelet fucntion

const germanVocab_MODEL = require("../models/germanVocab_MODEL");
const asyncHandler = require("express-async-handler");

exports.CREATE_germanVocab = asyncHandler(async (req, res) => {
  const vocab = new germanVocab_MODEL({
    title: req.body.title,
    translation: req.body.translation,
    explanation: req.body.explanation,
    priority: req.body.priority,
  });

  await vocab.save();
  res.status(201).json(vocab);
});

exports.LIST_germanVocabs = asyncHandler(async (req, res, next) => {
  const vocabs = await germanVocab_MODEL.find({}).exec();
  res.json(vocabs);
});

exports.FIND_germanVocab = asyncHandler(async (req, res, next) => {
  const vocab = await germanVocab_MODEL.findById(req.params.id).exec();
  return vocab
    ? res.json(vocab)
    : res.status(404).json({ message: `Coudn't find Vocab with ID ${req.params.id}` });
});

exports.DELETE_germanVocab = asyncHandler(async (req, res) => {
  const result = await germanVocab_MODEL.findByIdAndDelete(req.params.id);
  if (result) {
    res.json({ message: "Vocab removed" });
  } else {
    res.status(404).json({ message: "Vocab not found" });
  }
});

exports.UPDATE_germanVocab = asyncHandler(async (req, res) => {
  const vocab = await germanVocab_MODEL.findById(req.params.id);
  if (vocab) {
    vocab.title = req.body.title;
    vocab.translation = req.body.translation;
    vocab.explanation = req.body.explanation;
    vocab.priority = req.body.priority;

    const updatedVocab = await vocab.save();
    res.json(updatedVocab);
  } else {
    res.status(404).json({ message: `Coudn't find Vocab with ID ${req.params.id}` });
  }
});
