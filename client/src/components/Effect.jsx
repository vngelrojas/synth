import React, { useState } from "react";
import { Knob } from 'primereact/knob';
import { Button } from 'primereact/button';
import "primereact/resources/primereact.min.css";  
import "primereact/resources/themes/lara-light-indigo/theme.css"; 
import * as Tone from "tone";
import "../App.css";




export default function Effect(props) 
{
    const { knobNames, effectName, synth} = props;
    // effect param : [min,max,step]
    const knobRange = 
    {
        'wet': [0,1,0.01],
        'preDelay': [0,1,0.01],
        'decay': [0.01,20,0.5],
        'frequency':[0,5,0.1],
        'depth':[0,5,0.1],
        'delayTime':[0,1,0.01],
        'feedback':[0,1,0.01],
    };
    // Initialize the state object with default values for each knob
    const initialState = knobNames.reduce((acc, knobName) => 
    {
        return { ...acc, [knobName]: synth[effectName + "Settings"][knobName] };
    }, {});

    const [knobValues, setKnobValues] = useState(initialState);
    // State for the on/off button
    const [state,setState] = useState(false);
    
    
    const handleKnobChange = (knobName, newValue) => 
    {
        // Copy all other values and only update the one we want to change
        // Creating a new object each time to re-render the component
        setKnobValues((prevValues) => 
        ({
            ...prevValues,
            [knobName]: newValue,
        }));

        console.log(effectName + " "+ knobName + " " + newValue)
        // Change the effect and its parameter with the new value
        synth[effectName].set({[knobName]:newValue});
        synth[effectName + "Settings"][knobName] = newValue;
    };  

    const toggle = ((state) => 
    {
        // To re-render 
        setState(state);
        // Need since member functions of Synth are in camal case
        const capitalEffectName = `${effectName.charAt(0).toUpperCase()}${effectName.slice(1)}`;
        // connecting or disconnecting based on the state
        if(state)
        {
            synth["connect"+ capitalEffectName]();
        }
        else if(!state)
        {
            synth["disconnect"+ capitalEffectName]();
        }

        
    });

    return (
    <div className="effect">
        <label  style={{ textAlign: 'center', margin: '10px' }}>{effectName}</label>
        <Button label="ON" onClick={() => toggle(!state)} />
        {
            knobNames.map((knobName) => 
            (
                <div key={effectName + knobName} style={{ textAlign: 'center', margin: '10px' }}>
                    
                    <Knob
                        showValue={false}
                        key={knobName}
                        value={synth[effectName + "Settings"][knobName]}
                        onChange={(e) => handleKnobChange(knobName, e.value)}
                        min={knobRange[knobName][0]}
                        max={knobRange[knobName][1]}
                        step={knobRange[knobName][2]}
                        defaultValue={synth[effectName + "Settings"][knobName]}
                        strokeWidth={10}
                        disabled={state}
                        rangeColor="White"
                        valueColor="Black"
                    />
                    <label key={effectName + knobName}>{knobName}</label>
                </div>
            ))
        }
    </div>
    );
}

        
/* 
Effects list
-Reverb
    - decay
    - pre-delay
    - wet
-Chorus
    - frequency
    - depth
    - wet
-Tremolo
    - frequency
    - depth
    - wet
-Delay
    - delay-time
    - wet
    - feedback

*/