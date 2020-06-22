## Game of Life (React App)

This app is based on [Conway's game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life).

Deployed [here](http://www.disco-computer.com/game-of-life).

### Setup

Fork this repo, then run the following commands from the root folder.

`npm install`

### Running App

Type in the following command.

`npm start`

### Tests

I have unit tested this project using Jest and Enzyme, and used Cypress to feature test. To run unit tests, run the following command (you may need to hit 'a' to run all tests after the command).

`npm test`

To run feature tests, first run the following.

`npm start`

Once that has loaded, open another terminal and run the following.

`npx cypress open`

Then click on 'Run all specs'.

# File locations

Components are in `./src/components`.
Unit tests (Jest/Enzyme) are in `./src/__test__`.
Feature tests (Cypress) are in `./cypress/integration`

### Approach

For this project I opted to use react, as I wanted to get a visual representation of the data, as well as get some practice using react. I split it into cell components, row components and a game component. Each cell's state is stored in a master 'grid' in the game's state, and filtered down to the cell components. All the logic is in the game component.
