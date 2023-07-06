import Adsr from "./components/ADSR";
import SynthOptions from "./components/SynthOptions";
import "./App.css";

export default function App(props) {
  return (
    <div className="main">
      <SynthOptions className="synth-options" synth={props.synth} />
      <br></br>
      <Adsr synth={props.synth} />
    </div>
  );
}
