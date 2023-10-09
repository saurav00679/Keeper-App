import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {useParams} from 'react-router-dom';
import axios from "axios";

function EditArea(props){
    const navigate = useNavigate();

    const { id } = useParams();
    const [note, setNote] = useState({
      title: "",
      content:""
    });

    useEffect(() => {
      async function getNote(){
        const response = await axios.get(`http://localhost:4000/getNote/${id}`);
        setNote({
          title: response.data.title,
          content: response.data.content
        })
      }
      getNote();
    }, [id])
    

    function editedNote(event){
      const {name, value} = event.target;
      setNote((previousVal)=>{
        return {
          ...previousVal,
          [name]: value
        }
      })
    }

    async function editNote(event){
      event.preventDefault();
      try{
        const body = {
          id: id,
          title: note.title,
          content: note.content
        }
       const response = await axios.post("http://localhost:4000/editNote", body);
       navigate(`/keeper/${response.data.user_id}`);
      } catch(err){
        console.log(err);
        alert(err);
      }
    }

    return(
      <div className="edit-page">
        <h2>
            Edit Note
        </h2>
        <form className="edit-note"  onSubmit={editNote}>
          <input onChange={editedNote} name="title" value={note.title} type='text' placeholder="Title" required />
          <textarea onChange={editedNote} value={note.content} name = "content" type='text' placeholder="Take a Note..." rows = "3" required />

          <button type='Submit'>Edit</button>
        </form>
      </div>
      
    )
}

export default EditArea;