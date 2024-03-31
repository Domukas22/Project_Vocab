// write  adelet fucntion

const vocab_MODEL = require("../models/vocab_MODEL");
const asyncHandler = require("express-async-handler");
const deletedVocab_MODEL = require("../models/deletedVocab_MODEL");

exports.CREATE_vocab = asyncHandler(async (req, res) => {
  const vocab = new vocab_MODEL({
    list: req.body.list,
    title: req.body.title,
    translation: req.body.translation,
    explanation: req.body.explanation,
    priority: req.body.priority,
  });

  await vocab.save();
  res.status(201).json(vocab);
});

exports.LIST_vocabs = asyncHandler(async (req, res, next) => {
  const vocabs = await vocab_MODEL.find({}).exec();
  res.json(vocabs);
});

exports.FIND_vocab = asyncHandler(async (req, res, next) => {
  const vocab = await vocab_MODEL.findById(req.params.id).exec();
  return vocab
    ? res.json(vocab)
    : res.status(404).json({ message: `Coudn't find Vocab with ID ${req.params.id}` });
});

exports.DELETE_vocab = asyncHandler(async (req, res) => {
  // Find the vocab by ID
  const vocab = await vocab_MODEL.findById(req.params.id);

  if (vocab) {
    // Create a new document for the deletedVocab collection using the existing vocab data
    const deletedVocabData = {
      list: vocab.list,
      title: vocab.title,
      translation: vocab.translation,
      explanation: vocab.explanation,
      priority: vocab.priority,
      createdAt: vocab.createdAt,
      updatedAt: vocab.updatedAt,
    };
    const deletedVocab = new deletedVocab_MODEL(deletedVocabData);
    await deletedVocab.save();

    // Now, delete the vocab from the active collection
    await vocab_MODEL.findByIdAndDelete(req.params.id);
    res.json({ message: "Vocab moved to deleted and removed from active list" });
  } else {
    res.status(404).json({ message: "Vocab not found" });
  }
});

exports.UPDATE_vocab = asyncHandler(async (req, res) => {
  const vocab = await vocab_MODEL.findById(req.params.id);
  if (vocab) {
    vocab.list = req.body.list;
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
