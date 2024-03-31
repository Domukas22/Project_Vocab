//

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vocab_SCHEMA = new Schema(
  {
    list: { type: String, required: true },
    title: { type: String, required: true },
    translation: { type: String, required: true },
    explanation: { type: String, required: true },
    priority: { type: Number, required: true },
  },
  { timestamps: true, collection: "active" }
);

module.exports = mongoose.model("active", vocab_SCHEMA);
