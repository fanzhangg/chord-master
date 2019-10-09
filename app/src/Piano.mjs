// import Tone from "tone";

Synth.generate(1, "A", 2, 3);


// const synth = new Tone.Synth();
const synth = new Tone.PolySynth(3, Tone.Synth, {
    oscillator : {
        type: "square"
    }
}); // A polyphonic synthesizer composed of 3 voices of synth
// synth.oscillator.type = "sine"; // Set the tone to sine
// synth.set("detune", -1200);

const monoSynth = new Tone.Synth();

synth.toMaster();   // Connect it to the master output (speaker)
// synth.triggerAttackRelease(["C4", "E4", "A4"], "4n");
// synth.triggerRelease();
// monoSynth.toMaster();

const piano = document.getElementById("piano");
let currChord = [];

function playMonoChord(chord) {


    for (let i = 0; i < chord.length; i++) {
        monoSynth.triggerAttackRelease(chord[i], 0.5, i);
    }
}

piano.addEventListener("mousedown", e => {
    try {
        const root = e.target.dataset.note.toString(); // Root note is the clicked key
        const pitch = new Pitch(root.slice(0, -1), root.slice(-1));
        const chordType = ChordManager.getChordType();
        const chord = ChordManager.getChord(pitch, chordType);
        currChord = chord;

        synth.triggerAttackRelease(chord, "4n");
    }
    catch(e) {
        console.log("This is not a key");
    }

    // playMonoChord(chord);

    // synth.triggerAttack(e.target.dataset.note);
    // Fries off a  note continuously util the trigger is released
});

piano.addEventListener("mouseup", e => {
    // synth.triggerRelease(currChord, "0"); // Stops the trigger
});

document.addEventListener("keydown", e => {
    // e object has the key property to tell which key was pressed
    switch (e.key) {
        case "d":
            return synth.triggerAttack("C4");
        case "r":
            return synth.triggerAttack("C#4");
        case "f":
            return synth.triggerAttack("D4");
        case "t":
            return synth.triggerAttack("D#4");
        case "g":
            return synth.triggerAttack("E4");
        case "h":
            return synth.triggerAttack("F4");
        case "u":
            return synth.triggerAttack("F#4");
        case "j":
            return synth.triggerAttack("G4");
        case "i":
            return synth.triggerAttack("G#4");
        case "k":
            return synth.triggerAttack("A4");
        case "o":
            return synth.triggerAttack("A#4");
        case "l":
            return synth.triggerAttack("B4");
        default:
            return;
    }
});

document.addEventListener("keyup", e => {
    switch (e.key) {
        case "d":
        case "r":
        case "f":
        case "t":
        case "g":
        case "h":
        case "u":
        case "j":
        case "i":
        case "k":
        case "o":
        case "l":
            synth.triggerRelease();
    }
});
