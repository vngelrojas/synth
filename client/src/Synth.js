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
    }
    disconnectReverb()
    {
        this.reverb.disconnect(Tone.getDestination());
        this.instrument.disconnect(this.reverb);
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
};

export default Synth;