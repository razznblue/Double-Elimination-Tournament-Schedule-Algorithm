import { Team } from "./team.js";
import { Matchup } from "./matchup.js";
import { Season } from "./season.js";

const seasons = [];
const names = [
    "Barbashes",
    "Inklings",
    "Gilmore Girls",
    "Lumpia",
    "Ringworms",
    "Pinky Toes",
    "Ariolas",
    "Backyardigans",
    "Hunters",
    "Nostril Stuff",
    "Lukes",
    "The Dragonfly",
    "Hay There",
    "Tellytubies",
    "Malasadas",
    "Jalapenos",
];
const numberOfSeasons = 10;


// Run app.init() to start the program
const app = {
    init() {
        const teams = this.createTeams();
        for (let i = 1; i < numberOfSeasons + 1; i++) {
            const season = new Season(teams, i);
            season.start();
            seasons.push(season);
            season.getChampion();
        }
    },
    // Dynamiccaly add team objects to populate our teams array
    createTeams() {
        const teams = [];
        let c = 0;
        for (let i = 1; i < 17; i++) {
            if (i % 2 == 0) {
                let team = new Team(names[c], "1");
                teams.push(team);
                c++;
            } else if (i == 7) {
                let team = new Team(names[c], "2");
                teams.push(team);
                c++;
            } else {
                let team = new Team(names[c]);
                teams.push(team);
                c++;
            }
        }
        return teams;
    },
    showTeams(teams) {
        //console.log("# of Teams: " + teams.length);
        for (var team of teams) {
            team.showStats();
        }
    },

}

app.init();