import Adsr from "./components/ADSR";
import SynthOptions from "./components/SynthOptions";
import "./App.css";
import React, { useEffect, useState } from 'react';
import Effect from "./components/Effect";
import { Button } from "primereact/button";
import TextModal from "./components/TextModal";
import Popup from 'reactjs-popup';
import { InputText } from 'primereact/inputtext';
import 'reactjs-popup/dist/index.css';
import Presets from "./components/Presets";
import { Sidebar } from 'primereact/sidebar';


export default function App(props) 
{
  const synth = props.synth;
  const [presetName,setPresetName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [presets,setPresets] = useState([]);
  const [visible, setVisible] = useState(false);
  const [presetDict,setPresetDict] = useState({});

  function createDictionary(keys,values)
  {
    if(keys.length != values.length)
      throw new Error('Key and value arrays have different size')
    else
    {
      const dict = {};
      for (let i = 0; i < keys.length; i++) 
      {
        dict[keys[i]] = values[i];
      }
      return dict;
    }
  }

  useEffect(() => 
  {
    
    // Make a GET request to the server to check if the user is logged in
    fetch('http://localhost:3001/check-auth', {credentials: 'include'})
      .then(response => response.json())
      .then(data => {
        setPresets(data.presets);
        setIsLoggedIn(data.isLoggedIn);
        try
        {
          //Map the names of the presets to all info of preset 
          setPresetDict(createDictionary(data.presets,data.presetsData));
        }
        catch(err)
        {
          console.log(err);
        }
      })
      .catch(error => {
        console.error('Error checking authentication:', error);
      });
  },[]);

  function savePreset()
  { 
    //Assign presetName to this var because schema has "name": and not "presetName": 
    var name = presetName;
    //Prepending the name of preset to setting json
    const settings = JSON.stringify({name,...JSON.parse(synth.getSynthSettings())},null,2)
    console.log(settings);

    fetch('http://localhost:3001/save', 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include",
      body: settings
    }).then(response => 
      {
        if (response.ok) 
        {
          // Request was successful
          console.log('Data sent successfully');
        } 
        else 
        {
          // Request failed
          console.error('Failed to send data');
        }
      }).catch(error => 
      {
        console.error('Error sending data:', error);
      });

  }

  const loadPreset = (presetName) => 
  {
    console.log(`Play button clicked for preset: ${presetName}`);
    console.log(presetDict[presetName]);
    synth.load(presetDict[presetName]);
    // Add your logic for handling the play button click event in the Sidebar component
  };
  const deletePreset = (presetName) => 
  {
    setPresets((prevPresets) => prevPresets.filter((preset) => preset !== presetName));
  };

  return(
    <div className="main">
    {!isLoggedIn && <Button>Log In</Button>}
    {isLoggedIn &&  
        <div className="card flex justify-content-center">
        <Sidebar visible={visible} position="right" onHide={() => setVisible(false)}>
          <Presets presetArray={presets} onPlayButtonClick={loadPreset} delete={deletePreset}></Presets>
        
        </Sidebar>
        <Button label='Presets' onClick={() => setVisible(true)} />
      </div>
    }
    <br></br>
    <SynthOptions className="synth-options" synth={props.synth} />
    <br></br>
    <Adsr synth={synth} />
    <br></br>
    <br></br>
    <br></br>
    <div className="effect-rack">
      <Effect knobNames={["wet","decay","preDelay"]} effectName="reverb" synth={synth} />
      <Effect knobNames={["wet","frequency","depth"]} effectName="chorus" synth={synth} />
      <Effect knobNames={["wet","delayTime","feedback"]} effectName="delay" synth={synth} />
    </div>
    {isLoggedIn && 
    (
  
      <div>
        <Popup trigger={<Button label="save"></Button> } modal>

          {(close) =>
          (
            <>
              
              <InputText maxLength={20} placeholder="Preset Name" onChange={(e) => setPresetName(e.target.value)} />
              <Button onClick={() => {savePreset();close();}}>Save</Button>
            </>
          )}
        </Popup>
      </div>
    )}
    </div>

  );
}

