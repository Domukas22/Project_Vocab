//

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deletedVocab_SCHEMA = new Schema(
  {
    list: { type: String, required: true },
    title: { type: String, required: true },
    translation: { type: String, required: true },
    explanation: { type: String, required: true },
    source: { type: String, required: true },
    priority: { type: Number, required: true },
  },
  { timestamps: true, collection: "deleted" }
);

module.exports = mongoose.model("deleted", deletedVocab_SCHEMA);
