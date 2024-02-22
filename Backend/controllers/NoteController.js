const userModel = require ("../models/UserModel");
const noteModel = require("../models/NotesModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

exports.getNoteController = async (req, res) => {
  try {
    const { user } = req.body;
    const query = {
      user: user,
      isArchived: false,
    };
    const data = await noteModel.find(query).sort("-createdAt");
    if (data.length == 0) {
      return res.status(200).send({
        success: true,
        message: "Not created any note yet",
        count: data.length,
      });
    }
    if (data) {
      return res.status(200).send({
        success: true,
        message: "Got all the notes Successfully",
        count: data.length,
        data,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(501).send({
      success: false,
      message: "Error while getting Notes",
    });
  }
};

exports.createNoteController = async (req, res) => {
  try {
    const { title, content, user } = req.body;
    const existingUser = await userModel.findById(user);
    if (!existingUser) {
      return res.status(202).send({
        success: false,
        message: "Unable to find user",
      });
    }

    const newNote = await noteModel({
      title,
      content,
      user,
      lastEditedBy: user,
    });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newNote.save({ session });
    existingUser.notes.push(newNote);
    await existingUser.save({ session });
    await session.commitTransaction();

    await newNote.save();
    return res.status(200).send({
      success: true,
      message: "Successfully Created note",
      data:newNote,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).send({
      success: false,
      message: "Error while creating Note",
    });
  }
};

exports.updateController = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await noteModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    if (!note) {
      return res.status(404).send({
        success: false,
        message: "Note not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Note Updated Successfully",
      data:note,
    });
  } catch (error) {
    return res.status(501).send({
      success: false,
      message: "Error while updating Note",
    });
  }
};

exports.deleteController = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await noteModel.findOneAndDelete(id).populate("user");
    if (!note) {
      return res.status(501).send({
        success: false,
        message: "Note doesn't exists",
      });
    }
    await note.user.notes.pull(note._id);
    await note.user.save();

    return res.status(200).send({
      success: true,
      message: "Note Deleted",
      data:note
    });
  } catch (error) {
   
    return res.status(501).send({
      success: false,
      message: "Error while deleting Note",
    });
  }
};

exports.archiveController = async (req, res) => {
  try {
    const { user } = req.body;
    const { id } = req.params;
    const note = await noteModel.findByIdAndUpdate(
      id,
      { $set: { isArchived: true, archivedAt: Date.now() } },
      { new: true }
    );
    if (!note) {
      return res.status(501).send({
        success: false,
        message: "Note doesn't exists",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Archived Successfully",
      note
    });
  } catch (error) {
    return res.status(501).send({
      success: false,
      message: "Error while archiving Note",
    });
  }
};

exports.getArchiveNotesController = async (req, res) => {
  try {
    const { user } = req.body;
    const query = {
      user: user,
      isArchived: true,
    };

    const data = await noteModel.find(query).sort("-createdAt");
    if (data.length == 0) {
      return res.status(200).send({
        success: true,
        message: "Not archived any note yet",
        count: data.length,
      });
    }
    if (data) {
      return res.status(200).send({
        success: true,
        message: "Got all the archived notes Successfully",
        count: data.length,
        data,
      });
    }
  } catch (error) {
    return res.status(501).send({
      success: false,
      message: "Error while getting archived Note",
    });
  }
};

exports.unarchivedController = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req.body;
    const session = await mongoose.startSession();
    session.startTransaction();
    const note = await noteModel.findOne({
      _id: id,
      user: user,
      isArchived: true,
    });
    if (!note) {
      return res.status(501).send({
        success: false,
        message: "Note doesn't exists",
      });
    }
    note.isArchived = false;
    note.archivedAt = null;
    await note.save({ session });
    await session.commitTransaction();
    return res.status(200).send({
      success: true,
      message: "Successfully unarchived Note",
    });
  } catch (error) {
    return res.status(501).send({
      success: false,
      message: "Error while unarchiving Note",
    });
  }
};

exports.searchController = async (req, res) => {
  try {
    const { q } = req.query;
    const { user } = req.body;

    const searched_notes = await noteModel.find({
      $and: [
        { user: user },
        {
          $or: [
            { title: { $regex: q, $options: "i" } },
            { content: { $regex: q, $options: "i" } },
          ],
        },
      ],
    });

    if (!searched_notes) {
      return res.status(500).send({
        success: false,
        message: "No notes with such query found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Searched results found Successfully",
      searched_notes,
    });
  } catch (error) {
    return res.status(501).send({
      success: false,
      message: "Error while searching Note",
    });
  }
};
