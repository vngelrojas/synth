
import React from 'react';
import Popup from 'reactjs-popup';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import 'reactjs-popup/dist/index.css';

export default function TextModal()
{
    return(
        <div>
            <Popup trigger={<button className="button"> Open Modal </button>} modal>
            <InputText maxLength={20} placeholder={"Preset Name"}></InputText>
            <Button>Save</Button>
            </Popup>
        </div>
    );
}