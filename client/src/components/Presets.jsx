import { Button } from 'primereact/button';
import "./presetStyle.css";
import { InputText } from 'primereact/inputtext';

function deletePreset()
{

}

export default function Presets(props)
{
    const presets = props.presetArray;
    const loadPreset = (presetName) => {
        props.onPlayButtonClick(presetName);
      };

    return(
        <>
        <h1>Presets</h1>
        <InputText placeholder='Preset Name'></InputText>
        <div className='main-page'>
     
            <ul>
                {
                    presets.map((presetName) =>(
                        <li key={presetName}>
                        {presetName}
                        <Button onClick={() => loadPreset(presetName)}>Play</Button>
                        <Button onClick={() => deletePreset(presetName)}>Delete</Button>
                        </li>
                    ))
                }   
            </ul>

        </div>    
        </>
    );
}
