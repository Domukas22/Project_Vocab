// create a vocab_SCHEMA that would be reflec tthe following json string: {"_id":{"$oid":"6607ef88710053c40c6c8d21"},"title":"<p>A new title babyyy</p>","translation":"<p>A paragraph</p>","explanation":"<p>An explanation</p>","priority":"Medium"}

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const germanVocab_SCHEMA = new Schema(
  {
    title: { type: String, required: true },
    translation: { type: String, required: true },
    explanation: { type: String, required: true },
    priority: { type: Number, required: true },
  },
  { timestamps: true, collection: "german" }
);

module.exports = mongoose.model("german", germanVocab_SCHEMA);
