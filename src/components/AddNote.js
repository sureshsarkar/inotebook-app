import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';

export default function AddNote(props) {
    const context = useContext(NoteContext);
    const { addNote } = context;
    const [note, setNotes] = useState({ title: "", description: "", tag: "" });
    // To add note function
    const handelClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNotes({ title: "", description: "", tag: "" });
        props.showAlert("Added successfully","success")
    }
    // On typing note 
    const onChange = (e) => {
        setNotes({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="container my-3">
                <h1>Add your notes </h1>

                <form>
                    <div className="form-group">
                        <label htmlFor="title">Title*</label>
                        <input type="text" className="form-control my-2" placeholder="Enter title" minLength={5} required id="title" value={note.title} name="title" onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description*</label>
                        <input type="text" className="form-control my-2" placeholder="Enter description" minLength={5} required id="description" value={note.description} name="description" onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="tag">tag*</label>
                        <input type="text" className="form-control my-2" placeholder="Enter tag" minLength={5} required id="tag" name="tag" value={note.tag} onChange={onChange} />
                    </div>
                    <button type="submit" disabled={note.title.length < 5 || note.description.length <5} className="btn btn-primary" onClick={handelClick}>Add Note</button>
                </form>
            </div>
        </>
    )
}
