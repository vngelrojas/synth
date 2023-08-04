import { Button } from 'primereact/button';
import "./presetStyle.css";
import { InputText } from 'primereact/inputtext';
import { useState,useRef } from 'react';

import { ConfirmDialog } from 'primereact/confirmdialog'; // To use <ConfirmDialog> tag
import { confirmDialog } from 'primereact/confirmdialog'; // To use confirmDialog method
 


export default function Presets(props)
{
    const presets = props.presetArray;
    //const [presets,setPresets] = useState(props.presetArray);
    const loadPreset = (presetName) => 
    {
        props.onPlayButtonClick(presetName);
    };

    function deletePreset(presetName)
    {
        try
        {
            const requestOptions = 
            {
                method: 'DELETE',
                credentials: 'include',
                headers: 
                {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ toDelete: presetName }),
            };

            fetch('http://localhost:3001/delete-preset',requestOptions);
            // Call the delete in parent component to re-render
            props.delete(presetName);
        }
        catch(err)
        {
            console.log(err);
        }
    }


    const confirm = (presetName) => {
        confirmDialog({
            message: 'Are you sure you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => deletePreset(presetName),
            reject: () => {}
        });
    }
    
    return(
        <>
        <h1>Presets</h1>
        {/* <InputText placeholder='Preset Name'></InputText> */}
        <div className='main-page'>
     
            <ul>
                {
                    presets.map((presetName) =>(
                        <li key={presetName}>
                            <label>{presetName}</label>
                            <Button onClick={() => loadPreset(presetName)} label='Play'></Button>
                            <Button onClick={() => confirm(presetName)} icon="pi pi-check" label="Delete"></Button>
                            
                        </li>
                    ))
                }   
            </ul>

            <ConfirmDialog />

        </div>    
        </>
    );
}
