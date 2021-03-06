import { Team } from "./team.js";
import { Matchup } from "./matchup.js";


// Run app.init() to start the program
const app = {
    init() {
        const teams = this.createTeams();

        const firstRound = this.getMatchups(teams, "1");
        const firstRoundGroups = this.executeRound(firstRound, "1");

        const secondRoundGanhar = this.getMatchups(firstRoundGroups[0], "2");
        const secondRoundPerder = this.getMatchups(firstRoundGroups[1], "2");
        const secondRoundGanharTeams = this.executeRound(secondRoundGanhar, "2", "ganhar");
        const secondRoundPerderTeams = this.executeRound(secondRoundPerder, "2", "perder");

        const thirdRounders1 = secondRoundGanharTeams[1];
        const thirdRounders2 = secondRoundPerderTeams;
        // console.log("First Third Rounders:");
        // for (var t of thirdRounders1) {
        //     console.log("third rounder: " + t.name);
        // }
        // console.log("Second Third Rounders:");
        // for (var x of thirdRounders2) {
        //     console.log("third rounder: " + x.name);
        // }
        const thirdRoundTeams = thirdRounders1.concat(thirdRounders2);
        for (var t of thirdRoundTeams) {
            console.log("third rounder: " + t.name);
        }

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

    getMatchups(teams, round) {
        let c = 0;
        if (round === "1") {
            c = 6;
        } else if (round === "2") {
            c = 4;
        } else if (round === "3") {
            c = 2;
        }
        const matchups = [];
        const contenders = teams;
        console.log(teams.length);

        for (let i = 0; i < teams.length + c; i++) {
            const matchup = new Matchup();
            this.assignTeam(matchup, contenders);
            this.assignTeam(matchup, contenders);
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

    executeRound(matchups, round_number, id) {
        console.log("\nNew Round: , " + round_number + " , " + id);
        const competitors = [];
        const winners = [];
        const losers = [];
        for (let i = 0; i < matchups.length; i++) {
            const contenders = matchups[i].runMatch();
            winners.push(contenders[0]);
            losers.push(contenders[1]);
            console.log("WINNER: " + contenders[0].name);
        }
        if (round_number === "1") {
            competitors.push(winners, losers);
        } else if (round_number == "2" && id === "ganhar") {
            competitors.push(winners, losers);
        } else if (round_number == "2" && id === "perder") {
            return winners;
        } else if (round_number == "3") {
            return winners;
        }
        console.log("WINNERS");
        for (var w of winners) {
            console.log(w.name);
        }
        console.log("LOSERS");
        for (var l of losers) {
            console.log(l.name);
        }
        return competitors;
    }

}

app.init();