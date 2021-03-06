import { Team } from "./team.js";
import { Matchup } from "./matchup.js";


// Run app.init() to start the program
const app = {
    init() {
        const teams = this.createTeams();
        const firstRound = this.getMatchups(teams);
        this.executeRound(firstRound);
    },
    // Dynamiccaly add team objects to populate our teams array
    createTeams() {
        const teams = [];
        for (let i = 1; i < 17; i++) {
            let team = new Team("team" + i);
            teams.push(team);
        }
        return teams;
    },
    showTeams(teams) {
        console.log("# of Teams: " + teams.length);
        for (var team of teams) {
            team.printName();
        }
    },

    getMatchups(teams) {
        const matchups = [];
        console.log(teams.length);

        for (let i = 0; i < teams.length + 6; i++) {
            const matchup = new Matchup();
            this.assignTeam(matchup, teams);
            this.assignTeam(matchup, teams);
            matchups.push(matchup);
        }
        return matchups;
        //this.showTeams(teams);
        //console.log("\n");
        // for (var m of matchups) {
        //     console.log(m.teams);
        // }

    },
    // Add A Team to a matchup then remove it from the original teams array
    assignTeam(matchup, teams) {
        const team = this.getRandomTeam(teams);
        matchup.addTeam(team);   
        this.removeTeam(teams, team);
    },
    getRandomTeam(teams) {
        let randomIndex = Math.floor(Math.random() * teams.length);
        return teams[randomIndex];
    },
    removeTeam(teams, team) {
        const index = teams.indexOf(team);
        console.log("removed team: " + team.name);
        if (index > -1) {
            teams.splice(index, 1);
        }
    },

    executeRound(matchups) {
        const winners = [];
        const losers = [];
        for (let i = 0; i < matchups.length; i++) {
            const contenders = matchups[i].runMatch();
            winners.push(contenders[0]);
            losers.push(contenders[1]);
            console.log("WINNER: " + contenders[0].name);
        }
        console.log("WINNERS");
        for (var w of winners) {
            console.log(w.name);
        }
        console.log("LOSERS");
        for (var l of losers) {
            console.log(l.name);
        }
    }

}

app.init();