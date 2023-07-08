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
};

export default Synth;