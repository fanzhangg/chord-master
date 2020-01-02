![Logo of Chord Master](./src/images/icons/android-chrome-192x192.png)

# Chord Master &middot; [![Build Status](https://img.shields.io/travis/npm/npm/latest.svg?style=flat-square)](https://travis-ci.org/npm/npm) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/your/your-project/blob/master/LICENSE)

[Demo](https://fanzhangg.github.io/chord-master/) | [Producthunt](https://www.producthunt.com/posts/chord-master)

Chord Master is a web application for musicians to find new chord and create the chord progression.

Chords in the progression are represented by the lead sheet symbol. To build a chord, you can click the + button to add a chord, select the chord type and inversion in the dropdown menu, and choose the root note by clicking its key on the keyboard interface. You can also edit, delete or copy a chord. You can click the play button to listen to the entire chord progression. After finishing the progression, you can download the track as a MIDI file, and use the progression for your song.

## Usage

### Installation

1. Install Node.js from https://nodejs.org/en/download/
2. Install yarn: `npm install yarn`
3. Install dependencies: `yarn install`

### Development

Launch development server: `yarn start`

### Build

Compile TypeScript app and copy index.html to the dist folder: `yarn run build`

### Deploy

Deploy dist folder to GitHub Pages: `yarn run deploy`


## Credit

It is built by Fan Zhang, Aaron Gould, Randy Jose Beidelschies, and Roman Bactol. It uses Tone.js to play the piano sound, jQuery to manipulate the document element, Bootstrap as the front-end framework, and MidiWriter to write the MIDI file.

Many thanks to Shilad Sen for providing much help and guidance throughout our project.

## Contributing
We are thankful to the community for contributing bugfixes and improvements. Please follow the [Code of Conduct](./CODE_OF_CONDUCT.md) when contributing.

## License

Chord Master is [MIT licensed](./LICENSE).
