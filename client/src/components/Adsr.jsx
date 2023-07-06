import Slider from "./Slider";
import "./adsrStyle.css";
export default function Adsr(props) {
  return (
    <div className="ADSR">
      <Slider
        className="ADSR"
        name="attack"
        min={0}
        max={5}
        value={0}
        step={0.5}
        synth={props.synth}
      />
      <Slider
        className="ADSR"
        name="decay"
        min={0}
        max={2}
        value={1}
        step={0.5}
        synth={props.synth}
      />
      <Slider
        className="ADSR"
        name="sustain"
        min={0}
        max={1}
        value={0}
        step={0.01}
        synth={props.synth}
      />
      <Slider
        className="ADSR"
        name="release"
        min={0}
        max={15}
        value={0}
        step={1}
        synth={props.synth}
      />
    </div>
  );
}
