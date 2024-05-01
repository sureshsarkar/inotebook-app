import React from "react";
import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props)=>{
    const s1 = {
        "name": "Suresh",
        "class": "2a"
    }
    const [state, setState] = useState(s1);
    const update = ()=>{
        setTimeout(() => {
            setState({
                "name": "Sarkar",
                "class": "2b"
            })
        }, 2000);
    }

return (
       <NoteContext.Provider value={{state, update}}>
        {props.children}
        </NoteContext.Provider>
)}

export default NoteState;