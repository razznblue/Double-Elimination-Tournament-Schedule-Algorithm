import { Team } from "./team.js";
import { Matchup } from "./matchup.js";

const app = {
    init() {
        const teams = this.createTeams();
        this.getMatchups(teams);
    },
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
            // this.removeTeam(teams, teams[i]);
            // this.removeTeam(teams, teams[i + 1]);
            // const matchup = [];
            this.assignTeam(matchup, teams);
            this.assignTeam(matchup, teams);
            matchups.push(matchup);
        }
        this.showTeams(teams);
        console.log("\n");
        for (var m of matchups) {
            console.log(m.teams);
        }

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
    }

}

app.init();