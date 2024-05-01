import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

export const Notes = (props) => {
    const history = useNavigate()
    const context = useContext(NoteContext);
    const { notes, getNotes, editNote } = context;
    const [note, setNotes] = useState({id: "", etitle: "", edescription: "", etag: "" });
    
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes()
        }else{
            history("/login")
        }
    }, [])

    // function to update notes
    const updateNote = (currentNotes) => {
        ref.current.click();
        setNotes({id:currentNotes._id, etitle:currentNotes.title, edescription: currentNotes.description, etag:currentNotes.tag});
        
    }
    
    
    // To add note function
    const handelClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();

        props.showAlert("Updated successfully","success")
    }
    // On typing note 
    const onChange = (e) => {
        setNotes({ ...note, [e.target.name]: e.target.value })
    }

    const ref = useRef(null);
    const refClose = useRef(null);

    return (
        <>
            <AddNote showAlert ={props.showAlert}/>
            <button type="button" ref={ref} className="btn" data-toggle="modal" data-target="#exampleModalCenter">
            </button>

            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="container my-3">
                                <h1>Add your notes </h1>

                                <form>
                                    <div className="form-group">
                                        <label htmlFor="title">Title*</label>
                                        <input type="text" className="form-control my-2" placeholder="Enter title" id="etitle" minLength={5} required value={note.etitle} name="etitle" onChange={onChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">Description*</label>
                                        <input type="text" className="form-control my-2" placeholder="Enter description" id="edescription" minLength={5} required value={note.edescription} name="edescription" onChange={onChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="tag">tag*</label>
                                        <input type="text" className="form-control my-2" placeholder="Enter tag" id="etag" value={note.etag} minLength={5} required name="etag" onChange={onChange} />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handelClick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container my-3">
                <h1>Your Notes</h1>
                <div className="container">
                <div className="row">
                    {notes.length === 0 && 'No Notes to display'}
                    {notes.map((note) => {
                        return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
                    })}
                </div>
            </div>
            </div>
        </>
    )
}

export default Notes;