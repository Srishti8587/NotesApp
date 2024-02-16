const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "Title is required"],
    },

    content: {
      type: String,
      require: [true, "content is required"],
    },
    colorHex: {
      type: String,
      trim: true,
      default: "#ffffff",
      validate: {
        validator: (value) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value),
        message: "Invalid color hex format",
      },
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "user is required"],
    },
    sharedUsers: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    lastEditedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "user is required"],
    },
    isArchived: { type: Boolean, default: false, trim: true },
    archivedAt: { type: Number, default: null, trim: true },
    isTrashed: { type: Boolean, default: false, trim: true },
    trashedAt: { type: Number, default: null, trim: true },
    createdAt: { type: Number, default: null, trim: true },
    updatedAt: { type: Number, default: null, trim: true },
  },
  {
    timestamps: true,
  }
);

const NoteModel = mongoose.model("Note", noteSchema);
module.exports = NoteModel;
