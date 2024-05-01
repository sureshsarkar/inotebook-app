import React from "react";
import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {

  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  // Get All Notes function 
  const getNotes = async () => {
    // API call
    var url = `${host}/api/notes/fetchallnotes`;
    try {
      // console.log(localStorage.getItem("token"));
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token")
        },
        // body: JSON.stringify(title, description, tag)
      });
      const json = await response.json();

      setNotes(json)

    } catch (error) {
      console.error(error.message);
    }

  }

  // Add note function 
  const addNote = async (title, description, tag) => {
    // API call
    var url = `${host}/api/notes/addnotes`;
    try {

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag })
      });
      const note = await response.json();

      setNotes(notes.concat(note))

    } catch (error) {
      console.error(error.message);
    }
  }

  // Delete Note function
  const deleteNote = async (id) => {
    // TODO API call
    var url = `${host}/api/notes/deletenotes/${id}`;
    try {

      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
      });
      const json = await response.json();
      console.log(json);
      const newNotes = notes.filter((note) => { return note._id !== id })
      setNotes(newNotes)

    } catch (error) {
      console.error(error.message);
    }
  }

  // Edit Note function
  const editNote = async (id, title, description, tag) => {
    // API call
    var url = `${host}/api/notes/updatenote/${id}`;
    try {

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag })
      });
      const json = await response.json();
      // console.log(json)

      let newNotes = JSON.parse(JSON.stringify(notes))
      // Logic to edit Notes in cliet
      for (let i = 0; i < newNotes.length; i++) {
        const element = newNotes[i];
        if (element._id === id) {
          newNotes[i].title = title;
          newNotes[i].description = description;
          newNotes[i].tag = tag;
          break;
        }
      }
      setNotes(newNotes);

    } catch (error) {
      console.error(error.message);
    }
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;