const chromatic = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

class Pitch {
    constructor(note, octave) {
        this.note = note;
        this.octave = octave;
    }
}

// Get a note after `step` steps
function getNoteAfter(pitch, step){
    let noteIndex = chromatic.indexOf(pitch.note);
    if (noteIndex === -1){
        console.error("Invalid note");
    }
    let note = pitch.note;
    let octave = pitch.octave;
    if (noteIndex + step >= chromatic.length){  // The note is in the next octave
        octave++;
        note = chromatic[noteIndex + step - chromatic.length];
    } else {
        note = chromatic[noteIndex + step];
    }
    return new Pitch(note, octave);
}

// Get a major chord starting from the root pitch
function getMajorChord(root) {
    const third = getNoteAfter(root, 4);
    const fifth = getNoteAfter(root, 7);
    return [root, third, fifth];
}

// Get a minor chord starting from the root pitch
function getMinorChord(root) {
    const third = getNoteAfter(root, 3);
    const fifth = getNoteAfter(root, 7);
    return [root, third, fifth];
}

const pitch1 = new Pitch("C", 1);
const majorChord = getMajorChord(pitch1);
console.log(majorChord);

const minorChord = getMinorChord(pitch1);
console.log(minorChord);
