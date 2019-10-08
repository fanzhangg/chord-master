
// Chord Selection Logic:

let currentType = null;

function lastClicked(input) {
    document.getElementById("lastClicked").innerHTML = "Last Selected Chord: " + input;
    currentType = input
}

function alertCurrentChord() {
    alert(currentType)
}


// Chord Displaying Logic:

class Pitch {

    note;
    octave;

    constructor(note, octave) {
        this.note = note;
        this.octave = octave;
    }

    getNoteOctave(){
        return this.note + this.octave
    }
}

let testPitch = new Pitch("C", 2);

let chromatic = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

function getNextNote(pitch, step) {
    let noteIndex = chromatic.indexOf(pitch.note);
    let note = pitch.note;
    let octave = pitch.octave;
    if (noteIndex + step >= chromatic.length) {  // The note is in the next octave
        octave++;
        note = chromatic[noteIndex + step - chromatic.length];
    } else {    // the note is in the same octave
        note = chromatic[noteIndex + step];
    }
    return new Pitch(note, octave);
}

function getChord(root) {
    const types = {
        "Major Triad": [0, 4, 7],
        "Minor Triad": [0, 3, 7],
        "Diminished Triad": [0, 3, 6]
    };
    const steps = types[currentType];
    let resNotes = [];
    for (let i = 0; i < steps.length; i++) {
        const note = getNextNote(testPitch, steps[i]); //Assume for now the root is C
        resNotes.push(note);
    }
    return resNotes;
}

function typeChord(root) {
    let currentChord = getChord(root);

    let chordString = "";

    for (let i = 0; i < currentChord.length; i++) {
        chordString = chordString + currentChord[i].getNoteOctave() + " ";
    }

    document.getElementById("spelledChord").innerHTML = "Notes in chord: " + chordString
    ;
}