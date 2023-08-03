import { Button } from 'primereact/button';
import "./presetStyle.css";
import { InputText } from 'primereact/inputtext';



export default function Presets(props)
{
    const presets = props.presetArray;
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
            // 
            props.delete(presetName);
        }
        catch(err)
        {
            console.log(err);
        }
    }

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
