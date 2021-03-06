import { Team } from "./team.js";
import { Matchup } from "./matchup.js";
import { Season } from "./season.js";


// Run app.init() to start the program
const app = {
    init() {
        const teams = this.createTeams();

        const season = new Season(teams, 0);

        // FIRST ROUND
        const firstRound = this.getMatchups(teams, "1");
        const firstRoundGroups = this.executeRound(firstRound, "1");

        // SECOND ROUND
        const secondRoundGanhar = this.getMatchups(firstRoundGroups[0], "2");
        const secondRoundPerder = this.getMatchups(firstRoundGroups[1], "2");

        const secondRoundGanharTeams = this.executeRound(secondRoundGanhar, "2", "ganhar");
        const secondRoundPerderTeams = this.executeRound(secondRoundPerder, "2", "perder");

        const eliteEightTeams1 = secondRoundGanharTeams[0];

        const eliminated1 = secondRoundPerderTeams[1];
        this.addEliminatedTeams(teams, eliminated1);

        console.log("teams eliminated: " + teams.length);

        //THIRD ROUND
        const thirdRounders1 = secondRoundGanharTeams[1];
        const thirdRounders2 = secondRoundPerderTeams[0];
        const thirdRoundTeams = thirdRounders1.concat(thirdRounders2);

        const thirdRoundMatchups = this.getMatchups(thirdRoundTeams, "3");
        const endOfThirdRoundTeams = this.executeRound(thirdRoundMatchups, "3");

        const eliteEightTeams2 = endOfThirdRoundTeams[0];

        const eliminated2 = endOfThirdRoundTeams[1];
        this.addEliminatedTeams(teams, eliminated2);

        //PLAYOFFS
        const eliteEight = eliteEightTeams1.concat(eliteEightTeams2);

        const eliteEightMatchups = this.getMatchups(eliteEight, "4");
        const endOfEliteEightTeams = this.executeRound(eliteEightMatchups, "4");

        const finalFour = endOfEliteEightTeams[0];
        const eliminated3 = endOfEliteEightTeams[1];
        this.addEliminatedTeams(teams, eliminated3);


        const finalFourMatchups = this.getMatchups(finalFour, "5");
        const endOfFinalFourTeams = this.executeRound(finalFourMatchups, "5");

        const finalTwo = endOfFinalFourTeams[0];
        const eliminated4 = endOfFinalFourTeams[1];
        console.log(eliminated4[0].name + " " + eliminated4[1].name);
        this.addEliminatedTeams(teams, eliminated4);

        const championshipsMatchup = this.getMatchups(finalTwo);
        const afterChampionshipTeams = this.executeRound(championshipsMatchup, "6", "none", true);

        const champion = afterChampionshipTeams[0];
        const runnerUp = afterChampionshipTeams[1];
        champion[0].showStats();
        this.addEliminatedTeams(teams, runnerUp);
        this.addEliminatedTeams(teams, champion);

        console.log("\nAll Team Stats After The Season:\n\n");

        for (var t of teams) {
            t.showStats();
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
            team.showStats();
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
        } else if (round === "4") {
            c = 2;
        } else if (round === "5") {
            c = 1;
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
        if (index > -1) {
            teams.splice(index, 1);
        }
    },
    addEliminatedTeams(teams, eliminated) {
        for (var te of eliminated) {
            teams.push(te);
        }
    },

    executeRound(matchups, round_number, id, championship) {
        console.log("\nNew Round: , " + round_number + " , " + id);
        const competitors = [];
        const winners = [];
        const losers = [];
        for (let i = 0; i < matchups.length; i++) {
            const contenders = matchups[i].runMatch(championship);
            winners.push(contenders[0]);
            losers.push(contenders[1]);
            console.log("WINNER: " + contenders[0].name);
        }
        competitors.push(winners, losers);
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