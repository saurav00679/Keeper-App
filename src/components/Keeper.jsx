import React, { useState, useEffect } from "react";
import {useParams} from 'react-router-dom';
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function Keeper(){
  const params = useParams();
  const [user, setUser] = useState({})
  const [notes, setNotes] = useState([]);
  const [notesChanged, setNotesChanged] = useState(false);

  useEffect(() => {
    async function fetch(){
      const user = await getUser();
      setUser(user);

      const notes = await fetchData();
      setNotes(notes);
    }
    fetch()
  }, [notesChanged])

  async function getUser(){
    try{
      const userResponse = await axios.get(`http://localhost:4000/getUser/${params?.id}`);
      return userResponse.data;
    } catch(err){
      console.error("Error fetching notes:", err);
    }

  }

  async function fetchData() {
    try {
      const response = await axios.get(`http://localhost:4000/notes/${params?.id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }

  async function addNote(title, content){
    try{
      const body = {
        title:  title,
        content: content,
        user_id: params.id
      };

      await axios.post("http://localhost:4000/note", body);
      const notes = await fetchData();
      setNotes(notes);
      setNotesChanged(!notesChanged);
    } catch(err){
      console.log(err);
      alert(err);
    }
  }

  async function deleteNote(id){
    try{
      await axios.post(`http://localhost:4000/deleteNote/${id}`);
      const notes = await fetchData();
      setNotes(notes);
      setNotesChanged(!notesChanged);
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