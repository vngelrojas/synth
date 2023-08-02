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
        this.instrumentSettings = 
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
        }
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
        this.chorusSettings.on = true;
    }
    disconnectChorus()
    {
        this.connectChorus();
        this.chorus.disconnect(Tone.getDestination());
        this.instrument.disconnect(this.chorus);
        this.chorusSettings.on = false;
    }
    connectDelay()
    {
        this.delay.toDestination();
        this.instrument.connect(this.delay);
        this.delaySettings.on = true;
    }
    disconnectDelay()
    {
        this.delay.disconnect(Tone.getDestination());
        this.instrument.disconnect(this.delay);
        this.delaySettings.on = false;

    }
    getSynthSettings()
    {
        const effectData = {
            synth: this.instrumentSettings,
            reverb: this.reverbSettings,
            chorus: this.chorusSettings,
            delay: this.delaySettings,
        }
        return JSON.stringify(effectData,null,2);
    }
    load(preset)
    {
        // Load ADSR, volume, and oscillator
        this.loadADSR('attack',preset.attack);
        this.loadADSR('decay',preset.decay);
        this.loadADSR('sustain',preset.sustain);
        this.loadADSR('release',preset.release);
        this.instrument.set({ volume: preset.volume });
        this.instrumentSettings.oscillator.volume = preset.volume;
        this.instrument.set({ oscillator: { type: preset.oscillator } });
        this.instrumentSettings.oscillator.type = preset.oscillator;

        // Load reverb
        this.reverb.set({decay:preset.reverb.decay});
        this.reverbSettings.decay = preset.reverb.decay;
        this.reverb.set({preDelay:preset.reverb.preDelay});
        this.reverbSettings.preDelay = preset.reverb.preDelay;
        this.reverb.set({wet:preset.reverb.wet});
        this.reverbSettings.wet = preset.reverb.wet;
        if(preset.reverb.on)
        {
            this.connectReverb();
        }
        else
        {
            this.disconnectReverb();
        }
        
        // Load Chorus
        this.chorus.set({frequency:preset.chorus.frequency});
        this.chorusSettings.frequency = preset.chorus.frequency;
        this.chorus.set({depth:preset.chorus.depth});
        this.chorusSettings.depth = preset.chorus.depth;
        this.chorus.set({wet:preset.chorus.wet});
        this.chorusSettings.wet = preset.chorus.wet;
        if(preset.chorus.on)
        {
            this.connectChorus();
        }
        else
        {
            this.disconnectChorus();
        }

        // Load delay 
        this.delay.set({delayTime:preset.delay.delayTime});
        this.delaySettings.delayTime = preset.delay.delayTime;
        this.delay.set({feedback:preset.delay.feedback});
        this.delaySettings.feedback = preset.delay.feedback;
        this.delay.set({wet:preset.delay.wet});
        this.delaySettings.wet = preset.delay.wet;
        if(preset.delay.on)
        {
            this.connectDelay();
        }
        else
        {
            this.disconnectDelay();
        }

    }
    loadADSR(name,value)
    {
        this.instrument.set({ envelope: { [name]: value } });
        this.instrumentSettings.envelope[name] = value;
    }
 
};

export default Synth;