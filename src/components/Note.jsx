import React, { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import EditIcon from '@mui/icons-material/Edit';

function Note(props){
  const [isFullTextVisible, setFullTextVisible] = useState(false);
  const options = { year: 'numeric', month: 'short', day: '2-digit' }

  return (
  <div className="note">
    <div className="noteHead">
      <h1>{props.title}</h1> 
      <a href={`/edit/${props.id}`}><button className="editButton"><EditIcon/></button></a>
    </div>

    <p>{isFullTextVisible ? props.content : props.content.slice(0, 40)}</p>

    {!isFullTextVisible && props.content.length > 40 && (
    <button className="viewBtn" onClick={() => setFullTextVisible(true)}><ArrowDropDownIcon/></button>)}

    {isFullTextVisible && props.content.length > 40 && (
    <button className="viewBtn" onClick={() => setFullTextVisible(false)}><ArrowDropUpIcon/></button>)}

    <p className="created-at">{new Date(props.createdAt).toLocaleDateString(undefined, options)}</p>

    <button className="deleteButton" onClick={()=>props.deleteNote(props.id)}><DeleteIcon/></button>
  </div>)
}
export default Note;