# Chord Master

[Demo](https://fanzhangg.github.io/chord-master/)

Chord Master is a web application to help musicians creating the chord progression. This app helps you find chords that work together.

Chords in the progression is represented by the lead sheet symbol. To build a chord, you can click the + button to add a chord, select the chord type and inversion in the dropdown menu, and choose the root note by clicking its key on the keyboard interface. You can also edit, delete or copy a chord. You can click the play button to listen to the entire chord progression.


## Usage

### Installation

1. Install Node.js from https://nodejs.org/en/download/
2. Install yarn:`npm install yarn`
3. Install dependencies: `yarn install`

### Development

Launch development server: `yarn start`

### Build

Compile TypeScript app and copy index.html to the dist folder: `yarn run build`

### Deploy

Deploy dist folder to GitHub Pages: `yarn run deploy`


## Credit

It is built by Fan Zhang, Aaron Gould, Randy Jose Beidelschies, and Roman Bactol. It uses Tone.js to play the piano sound, jQuery to manipulate the document element, and Bootstrap as the front-end framework.

Many thanks to Shilad Sen for providing much help and guidance throughout our project.

## Contributing
We are thankful to the community for contributing bugfixes and improvements. Please follow the [Code of Conduct](./CODE_OF_CONDUCT.md) when contributing.

## License

Chord Master is [MIT licensed](./LICENSE).
