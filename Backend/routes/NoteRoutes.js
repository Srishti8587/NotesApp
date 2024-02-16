const express = require("express");
const {
  createNoteController,
  getNoteController,
  updateController,
  deleteController,
  archiveController,
  getArchiveNotesController,
  unarchivedController,
  searchController,
} = require("../controllers/NoteController");
const { authenticator, validateBody } = require("../middlewares/noteVerification");

const router = express.Router();
router.post("/create-notes", authenticator,validateBody, createNoteController);
router.get("/get-notes", authenticator, getNoteController);
router.patch("/update-notes/:id", authenticator, updateController);
router.delete("/delete-notes/:id", authenticator, deleteController);
router.get("/archived-notes/:id", authenticator,archiveController);
router.get("/allarchived-notes", authenticator,getArchiveNotesController);
router.get("/unarchived-notes/:id",authenticator,unarchivedController);
router.get("/search-notes",authenticator,searchController);

module.exports = router;
