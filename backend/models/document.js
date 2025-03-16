import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: "New Additions",
  },
  description: {
    type: String,
    required: true,
    default: "To stay representative of framework & new example apps",
  },
  date: {
    type: Date,
    default: Date.now,
    get: (value) => {
      return new Date(value).toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      });
    },
  },
});

documentSchema.set("toJSON", { getters: true });

const Document = mongoose.model("Document", documentSchema);

export default Document;
