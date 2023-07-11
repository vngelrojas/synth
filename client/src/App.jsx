import Adsr from "./components/ADSR";
import SynthOptions from "./components/SynthOptions";
import "./App.css";
import React, { useEffect, useState } from 'react';
//import { Effect } from "tone/build/esm/effect/Effect";
import Effect from "./components/Effect";
import { Button } from "primereact/button";



export default function App(props) 
{
  const synth = props.synth;
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
  function savePreset()
  {
    const jsonString = synth.getEffectData();

    const fileData = new Blob([jsonString], {type: 'application/json'});
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(fileData);
    downloadLink.download = 'preset.json';
    downloadLink.click();  }
  if(isLoggedIn)
  {
    return (
      
      <div className="main">
        <SynthOptions className="synth-options" synth={props.synth} />
        <br></br>
        <Adsr synth={synth} />
        <br></br>
        <Button label="save" onClick={() => savePreset()}></Button>
        <br></br>
        <br></br>
        <div className="effect-rack">
          <Effect knobNames={["wet","decay","preDelay"]} effectName="reverb" synth ={synth}></Effect>
          <Effect knobNames={["wet","frequency","depth"]} effectName="chorus" synth={synth}></Effect>
          <Effect knobNames={["wet","delayTime","feedback"]} effectName="delay" synth={synth}></Effect>

        </div>
      </div>
    );
  }
  else
    return <h1>Not logged In</h1>;
}
