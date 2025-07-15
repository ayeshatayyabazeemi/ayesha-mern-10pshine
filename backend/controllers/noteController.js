const { default: mongoose } = require("mongoose");
const sanitizeHtml = require('sanitize-html');
const Note=require("../models/note");
pino=require('pino');
const logger=pino()
const User=require('../models/user')



const create = async (req, res) => {
  try {
    const { username, title, note } = req.body;
    const isalready = await Note.findOne({
  subject: { $regex: new RegExp('^' + title + '$', 'i') }
});

if (isalready) {
  return res.status(400).json({ message: "Title is already used, please choose a different one." });
}
if (!note) {
  return res.status(400).json({ message:"Note cannot be empty. Please write something before saving." });
}
if (!title) {
  return res.status(400).json({ message: "Title is required." });
}

     const cleanNote = sanitizeHtml(note, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2']),
      allowedAttributes: {
        '*': ['style', 'class'],
        'a': ['href', 'name', 'target'],
        'img': ['src']
      }
    });


    const lastNote = await Note.findOne().sort({ position: -1 });
    const position = lastNote ? lastNote.position + 1 : 1;
    console.log(username,cleanNote,title,position);
    const userData = await User.findOne({ username: username });
    
if (!userData) {
  return res.status(404).json({ message: "User not found" });
}

    const new_note = new Note({
      user:userData._id,
      subject: title,
      note:cleanNote,
      position
    });

    await new_note.save();

    logger.info(`Note "${title}" has been created successfully`);
    res.status(201).json(new_note);

  } catch (error) {
 const errMsg = error.response?.data?.message || error.message || "There was an error saving the note.";
  console.error("Error saving note:", errMsg);
  toast.error(errMsg); // Show specific error to user
  console.error("Error saving note:", errMsg);
 res.status(error.statusCode || 500).json({ message: errMsg }); // send message
}

};





// const remove = async (req, res, next) => {
//   try {
//     const { note_id } = req.query; 
//     const note = await Note.findById(note_id);
//     if (!note) {
//       return res.status(404).json({ message: "Note not found" });
//     }

//     await note.deleteOne();
//     logger.info(`Note ${note_id} has been deleted`);
//     res.status(200).json({ message: 'Note has been deleted' });

//   } catch (error) {
//     logger.error(`Delete error: ${error.message}`);
//     res.status(500).json({ message: "There is an error in deleting a note" });
//   }
// };


// const updateNote = async (req, res) => {
//   const { note_id, ...fieldsToUpdate } = req.body;

//   try {
//     const updatedNote = await Note.findByIdAndUpdate(
//       note_id,
//       { $set: fieldsToUpdate },
//       { new: true }
//     );
//     res.status(200).json(updatedNote);
//   } catch (error) {
//     res.status(500).json({ message: "Error updating note" });
//   }
// };

// const read = async (req, res) => {
//   try {
//     const user_id = req.query.user; 
//     console.log('useris: '+user_id);
//     const notes = await Note.find({ user: user_id}).sort({position:-1}); 
//     console.log(notes);
//     const count = await Note.countDocuments({ user: user_id });

//     logger.info(`Notes for user: ${user_id} have been read`);

//     res.status(200).json({ count, notes }); 
//   } catch (error) {
//     logger.error(`Read error: ${error.message}`);
//     res.status(500).json({ message: "There is an error in reading notes" });
//   }
// };


// const search = async (req, res) => {
//   try {
//     const { query } = req.query;

//     const searchResults = await Note.find({
//       $or: [
//         { subject: { $regex: query, $options: 'i' } },
//         { date: { $regex: query, $options: 'i' } },
//         { note: { $regex: query, $options: 'i' } }
//       ]
//     });

//     logger.info(`Search results for query: ${query}`);

//     res.status(200).json(searchResults);
//   } catch (error) {
//     logger.error(`Search error: ${error.message}`);
//     res.status(500).json({ message: "There is an error in searching notes" });
//   }
// };


module.exports={create};

