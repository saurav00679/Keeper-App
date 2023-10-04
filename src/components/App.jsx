import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App(){
    const [notes, setNotes] = useState([]);

    function addNote( title, content){
      setNotes((previousVal)=>{
        return [...previousVal, { title: title, content: content }]
      })
    }

    function deleteNote(id){
      setNotes((previousVal)=>{
        return previousVal.filter((_val, index)=>{
          return index !== id;
        })
      })
    }

    return (
    <div>
    <Header/>
    <CreateArea addNote={addNote}/>
    {notes.map((note, index) => 
    <Note 
      key={index}
      id={index}
      title={note.title}
      content={note.content}
      deleteNote={deleteNote}
    />)}
    
    <Footer/>
    </div>
    );
}

export default App;