export class MidiSaver {
    downloadBtn: HTMLElement;
    onGetChords: Function;
    constructor () {
        this.onGetChords = function(){};  // Callback event
        this.downloadBtn = document.getElementById("downloadBtn")!;
        this.downloadBtn.addEventListener("pointerup", ()=> {
            this._write()
        })
    }

    private _getChords(){
        return this.onGetChords();
    }

    private _write(){
        const chords = this._getChords();
        const MidiWriter = require('midi-writer-js');

        // Start with a new track
        const track = new MidiWriter.Track();

        // Define an instrument (optional):
        track.addEvent(new MidiWriter.ProgramChangeEvent({instrument: 1}));
        for (let chord of chords){
            const pitch = chord.getNotes(); //TODO: Not sure if it has been inversed
            var note = new MidiWriter.NoteEvent({pitch: pitch, duration: '1'}); // Set the duration to whole
            // Add some notes:
            track.addEvent(note);
        }

        // Generate a data URI
        var write = new MidiWriter.Writer(track);
        console.log(write.dataUri());

        // Download the midi file
        document.getElementById('my_iframe')!.src = write.dataUri();
    }
}








