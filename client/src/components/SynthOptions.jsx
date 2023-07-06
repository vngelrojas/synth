export default function SynthOptions(props) {
  let synth = props.synth; //The synth
  const buttonList = ["sine", "triangle", "sawtooth"]; // List of oscillator types

  const handleVolume = (e) => {
    synth.set({ volume: e.target.value });
  };

  const handleOsc = (e) => {
    synth.set({ oscillator: { type: e.target.name.toString() } });
  };

  return (
    <>
      {/*Iterate through buttonList and create buttons for the diff oscilators */}
      {buttonList.map((buttonName) => (
        <button
          key={buttonName}
          className="osc-button"
          name={buttonName}
          onClick={handleOsc}
        >
          {buttonName}
        </button>
      ))}

      {/*The volume slider */}
      <label>
        volume
        <input
          type="range"
          className="synth-volume"
          name="volume "
          min={-50}
          max={0}
          defaultValue={-20}
          step={1}
          onInput={handleVolume}
        ></input>
      </label>
    </>
  );
}
