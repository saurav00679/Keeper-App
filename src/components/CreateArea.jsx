import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

function CreateArea(props){
    const [note, setNote] = useState({
      title: "",
      content:""
    });
    const [isExpanded, setIsExpanded] = useState(false);

    function noteAdd(event){
      const {name, value} = event.target;
      setNote((previousVal)=>{
        return {
          ...previousVal,
          [name]: value
        }
      })
    }

    function addNote(event){
      props.addNote(note.title, note.content);
      setNote({title: "", content: ""})
      event.preventDefault();
    }

    return(
      <form className="create-note"  onSubmit={addNote}>
        { isExpanded && <input onChange={noteAdd} name="title" value={note.title} type='text' placeholder="Title" required />}
        <textarea onClick={() => setIsExpanded(true)} onChange={noteAdd} value={note.content} name = "content" type='text' placeholder="Take a Note..." rows={isExpanded ? 3: 1} required />
        {isExpanded && <Zoom in={isExpanded}>
          <Fab type='Submit'><AddIcon/>
        </Fab></Zoom>}
      </form>
    )
}

export default CreateArea;