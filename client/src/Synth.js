import * as Tone from "tone";

class Synth
{
    constructor()
    {
        this.instrument = new Tone.PolySynth(Tone.Synth, 
        {
            oscillator: 
            {
                type: "triangle",
                detune: 0,
                volume: -20,
            },
            envelope: 
            {
                attack: 0.1,
                decay: .5,
                sustain: .5,
                release: .5,
            },
        });
        
        this.reverb = new Tone.Reverb
        ({
            decay:0.01,
            preDelay: 0,
            wet: 0,
        
            
        });

        this.chorus = new Tone.Chorus
        ({
            wet:0,
            frequency: 0,
            depth: 0,
            spread:180,
            delayTime:1,
            type:'sine',

        })

        this.delay = new Tone.FeedbackDelay
        ({
            delayTime:0,
            feedback:0,
            wet:0,
            maxDelay:1,
        })
        // Settings for the different effects
        // The fron end directly changes the effects but also updates the values below
        // When we want to save the present we just stringify the objects below since you cant do it on Tone.Js objects
        this.reverbSettings = 
        {
            on: false,
            wet: 0,
            decay:0.01,
            preDelay: 0,
        
        }
        this.chorusSettings = 
        {
            on: false,
            wet:0,
            frequency: 0,
            depth: 0,
        }

        this.delaySettings = 
        {
            on: false,
            wet:0,
            delayTime:0,
            feedback:0,
        }
    }
    on()
    {
        this.instrument.toDestination();
    }
    off()
    {
        this.instrument.disconnect(Tone.getDestination());
    }
    connectReverb()
    {
        this.reverb.toDestination();
        this.instrument.connect(this.reverb);
        this.reverbSettings.on = true;
    }
    disconnectReverb()
    {
        this.reverb.disconnect(Tone.getDestination());
        this.instrument.disconnect(this.reverb);
        this.reverbSettings.on = false;
    }
    connectChorus()
    {
        this.chorus.toDestination().start();
        this.instrument.connect(this.chorus);
    }
    disconnectChorus()
    {
        this.chorus.disconnect(Tone.getDestination());
        this.instrument.disconnect(this.chorus);
    }
    connectDelay()
    {
        this.delay.toDestination();
        this.instrument.connect(this.delay);
    }
    disconnectDelay()
    {
        this.delay.disconnect(Tone.getDestination());
        this.instrument.disconnect(this.delay);
    }
    getEffectData()
    {
        const effectData = {
            reverb: this.reverbSettings,
            chorus: this.chorusSettings,
            delay: this.delaySettings,
        }
        return JSON.stringify(effectData,null,2);
    }
};

export default Synth;