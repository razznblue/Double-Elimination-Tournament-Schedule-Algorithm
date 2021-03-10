// LOCAL MODULES
import { Team } from "./src/team.js";
import { League } from "./src/league.js";

// MIDDLEWARE

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


// Run app.init() to start the program
const main = {
    init() {
        // const teams = this.createTeams();
        // const tourney = new League("DESCL", teams);
        // console.log("League is processing");
        // setTimeout(() => {
        //     tourney.start();
        //     console.log(tourney.getAllChampions());
        // }, 2000);
        
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

main.init();