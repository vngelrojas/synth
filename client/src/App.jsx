import Adsr from "./components/ADSR";
import SynthOptions from "./components/SynthOptions";
import "./App.css";
import React, { useEffect, useState } from 'react';



export default function App(props) 
{

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
    
  //   // Make a GET request to the server to check if the user is logged in
  //   fetch('http://localhost:3001/check-auth', {credentials: 'include'})
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log(data);
  //       setIsLoggedIn(data.isLoggedIn);
  //     })
  //     .catch(error => {
  //       console.error('Error checking authentication:', error);
  //     });
  // },[]);
  const isLoggedIn = true;
  if(isLoggedIn)
  {
    return (
      
      <div className="main">
        <SynthOptions className="synth-options" synth={props.synth} />
        <br></br>
        <Adsr synth={props.synth} />
      </div>
    );
  }
  else
    return <h1>Not logged In</h1>;
}
