import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';
export const NoteItem = (props) => {
    const { note, updateNote } = props;

    const context = useContext(NoteContext);
    const { deleteNote } = context;
    // const { deleteNote, editNote} = context;


    return (
        <>
            <div className="col-md-3 my-1">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex flex-row">
                            <h5 className="card-title">{note.title}</h5>
                            <div className="btn btn-light mx-2 p-2 text-dark"><i className="bi bi-trash" onClick={() => { deleteNote(note._id); props.showAlert("Deleted successfully", "success") }}></i></div>
                            <div className="btn btn-light mx-2 p-2 text-dark"><i className="bi bi-pencil-square" onClick={() => { updateNote(note) }}></i></div>
                        </div>
                        <p className="card-text">{note.description}</p>
                    </div>
                </div>
            </div>
        </>
    )
}


export default NoteItem; 
