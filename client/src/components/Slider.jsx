import * as Tone from "tone";

export default function Slider(props) {
  const { className, name, min, max, value, step, synth } = props;

  function handleInput(e) {
    let value = e.target.value;
    synth.instrument.set({ envelope: { [name]: value } });
    
  }

  return (
    <>
      <label>
        {name}
        <input
          className={className}
          name={name}
          type="range"
          id={name + "-slider"}
          min={min}
          max={max}
          defaultValue={value}
          step={step}
          onInput={handleInput}
        />
      </label>
    </>
  );
}
