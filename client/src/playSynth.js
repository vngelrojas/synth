import Synth
from './Synth'
// Map keys to notes
const keyMap = {
  a: "C4",
  w: "C#4",
  s: "D4",
  e: "D#4",
  d: "E4",
  f: "F4",
  t: "F#4",
  g: "G4",
  y: "G#4",
  h: "A4",
  u: "A#4",
  j: "B4",
  k: "C5",
  o: "C#5",
  l: "D5",
  p: "D#5",
};

// Keep track of currently pressed keys
let pressedKeys = new Set();
// Keep track of currently pressed notes
let activeNotes = [];

// Listen for keydown events
document.addEventListener("keydown", (event) => {
const key = event.key.toLowerCase();
// Check if the pressed key is mapped to a note
const note = keyMap[key];
//if note is being played and key is not in set
if (note&& !pressedKeys.has(key)) {
  // Play the note
  activeNotes.push(note);
  synth.instrument.triggerAttack(note);
  pressedKeys.add(key);
  
}
});

// Listen for keyup events
document.addEventListener('keyup', (event) => 
{
const key = event.key.toLowerCase();
// Check if the released key is mapped to a note
const note = keyMap[key];
if (note) {
  // Stop the currently playing note
  synth.instrument.triggerRelease(note);
  activeNotes = [];
  //delete key from set
  pressedKeys.delete(key);
}
});


let synth = new Synth();
synth.on();


export default synth;