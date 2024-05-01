const express = require("express");
const Notes = require('../models/notes');
const router = express.Router();
const fetchuser = require('../midddleware/fetchuser');
const { body, validationResult } = require('express-validator');

//ROUTES: 1****************************** To fetch all notes from database using: GET "/api/notes/fetchallnotes". ****************************
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {

        const notes = await Notes.find({ user: req.user.id })
        res.json({ count: notes.length, success: true, notes: notes });
    }
    catch (error) {
        var success = true;
        res.status(500).send({ success: success, error: 'Some error occured' })
    }
})

//ROUTES: 2****************************** To add notes into database  using: POST "/api/notes/addnotes". ****************************
router.post('/addnotes',
    fetchuser,
    [
        body('title', 'Enter a valid title').isLength({ min: 5 }),
        body('description', 'Enter a valid description').isLength({ min: 6 })
    ],

    async (req, res) => {

        try {
            const { title, description, tag } = req.body;

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const note = new Notes({
                title, description, tag, user: req.user.id
            })
            const saveNote = await note.save();
            res.send(saveNote);
        }
        catch (error) {
            var success = false;
            res.status(500).send({ success: success, error: 'Some error occured' })
        }
    })

//ROUTES: 3****************************** To update note using: PUT "/api/notes/updatenote/:id"****************************

router.put('/updatenote/:id', fetchuser, async (req, res) => {

    const { title, description, tag } = req.body;
    try {
        // create object to add data
        let newNote = {};

        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // find the note to be updated and update it 
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send({ success: success, error: "Note not found" }) }

        // check the existing user is in this note or not
        if (note.user.toString() != req.user.id) { return res.status(401).send("Not Allowed") }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ success: true, note });

    } catch (error) {
        res.status(500).send({ success: false, error: 'Some error occured' })
    }
})

//ROUTES: 4****************************** To deleet note using: PUT "/api/notes/deletenotes/:id"****************************

router.delete('/deletenotes/:id', fetchuser, async (req, res) => {
    try {
        // find the note to be deleted and delete it 
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Note not found") }

        // check the existing user is in this note or not if yes -> Delete note
        if (note.user.toString() != req.user.id) { return res.status(401).send("Not Allowed") }

        note = await Notes.findByIdAndDelete(req.params.id, { new: true })
        var success = true;
        res.json({ sussess: success, note: note });

    } catch (error) {
        var success = false;
        res.status(500).send({ success: success, error: 'Some error occured' })
    }
})

module.exports = router