import React, { useState, useEffect } from "react";
import {useParams} from 'react-router-dom';
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function Keeper(){
  const { id } = useParams();
  const [user, setUser] = useState({})
  const [notes, setNotes] = useState([]);
  const [notesChanged, setNotesChanged] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [userResponse, notesResponse] = await Promise.all([
          axios.get(`http://localhost:4000/getUser/${id}`),
          axios.get(`http://localhost:4000/notes/${id}`)
        ]);
  
        setUser(userResponse.data);
        setNotes(notesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  
    fetchData();
  }, [id, notesChanged]);

  async function addNote(title, content){
    try{
      const body = {
        title:  title,
        content: content,
        user_id: id
      };
      await axios.post("http://localhost:4000/note", body);
      setNotesChanged((previousVal) => !previousVal);
      
    } catch(err){
      console.log(err);
      alert(err);
    }
  }

  async function deleteNote(id){
    try{
      await axios.post(`http://localhost:4000/deleteNote/${id}`);

      setNotesChanged((previousVal ) => !previousVal);
    } catch(err){
      alert(err);
    }
  }

  return (
  <div>
    <Header isLoggedIn={true}/>
    <CreateArea addNote={addNote}/>

    {notes.length >0 && <p className="user-details">{user.name}'s Notes ( Total: {notes.length} )</p>}
    {notes.map((note) => 
    <Note 
      key={note._id}
      id={note._id}
      title={note.title}
      content={note.content}
      deleteNote={deleteNote}
    />)}

    <Footer/>
  </div>
  );
}

export default Keeper;