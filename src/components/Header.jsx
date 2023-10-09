import React from "react";
import HighlightIcon from '@mui/icons-material/Highlight';

function Header(props){
    return (
    <header>
      <h1><HighlightIcon />Keeper <br/><span>Write your daily notes</span></h1>
      {props.isLoggedIn && <a href="/"><button>Logout</button></a>}
    </header>
    );
}

export default Header;