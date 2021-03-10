import { Matchup } from "./matchup.js";

export class Season {
    constructor(teams, number) {
        this.teams = teams;
        this.seasonNumber = number;
        this.eliteEight = [];
        this.finalFour = [];
        this.finalTwo = [];
        // this.champion
        // this.runnerUp
    }

    start() {
        const postFirstRoundGroups = this.doFirstRound(this.teams);
        const postSecondRoundGroups = this.doSecondRound(postFirstRoundGroups);
        this.doThirdRound(postSecondRoundGroups);
        this.doPlayoffs();
    }

    doFirstRound(teams) {
        const firstRound = this.getMatchups(teams, "1");
        const firstRoundGroups = this.executeRound(firstRound, "1");
        return firstRoundGroups;
    }

    doSecondRound(firstRoundGroups) {
        const secondRoundGanhar = this.getMatchups(firstRoundGroups[0], "2");
        const secondRoundPerder = this.getMatchups(firstRoundGroups[1], "2");
    
        const secondRoundGanharTeams = this.executeRound(secondRoundGanhar, "2", "ganhar");
        const secondRoundPerderTeams = this.executeRound(secondRoundPerder, "2", "perder");

        const eliteEightTeams1 = secondRoundGanharTeams[0];
        for (const t of eliteEightTeams1) {
            this.eliteEight.push(t);
        }

        const eliminated = secondRoundPerderTeams[1];
        this.addEliminatedTeams(this.teams, eliminated);

        const roundThreeTeams = secondRoundGanharTeams[1].concat(secondRoundPerderTeams[0]);
        return roundThreeTeams;
    }

    doThirdRound(thirdRoundTeams) {

        const thirdRoundMatchups = this.getMatchups(thirdRoundTeams, "3");
        const endOfThirdRoundTeams = this.executeRound(thirdRoundMatchups, "3");

        const eliteEightTeams2 = endOfThirdRoundTeams[0];
        for (const t of eliteEightTeams2) {
            this.eliteEight.push(t);
        }

        const eliminated = endOfThirdRoundTeams[1];
        this.addEliminatedTeams(this.teams, eliminated);
    }

    doPlayoffs() {
        //const eliteEight = eliteEightTeams1.concat(eliteEightTeams2);

        const eliteEightMatchups = this.getMatchups(this.eliteEight, "4");
        const endOfEliteEightTeams = this.executeRound(eliteEightMatchups, "4");

        this.finalFour = endOfEliteEightTeams[0];
        const eliminated = endOfEliteEightTeams[1];
        this.addEliminatedTeams(this.teams, eliminated);

        // FINAL FOUR
        const finalFourMatchups = this.getMatchups(this.finalFour, "5");
        const endOfFinalFourTeams = this.executeRound(finalFourMatchups, "5");

        this.finalTwo = endOfFinalFourTeams[0];
        const eliminated2 = endOfFinalFourTeams[1];
        this.addEliminatedTeams(this.teams, eliminated2);

        // FINAL TWO
        const championshipsMatchup = this.getMatchups(this.finalTwo);
        const afterChampionshipTeams = this.executeRound(championshipsMatchup, "6", "none", true);

        // CHAMPIONSHIP
        this.champion = afterChampionshipTeams[0];
        this.runnerUp = afterChampionshipTeams[1];

        this.champion[0].addYearWon(this.seasonNumber);
        //champion[0].showStats();
        this.addEliminatedTeams(this.teams, this.runnerUp);
        this.addEliminatedTeams(this.teams, this.champion);
    }

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
        for (let i = 0; i < teams.length + c; i++) {
            const matchup = new Matchup();
            this.assignTeam(matchup, contenders);
            this.assignTeam(matchup, contenders);
            matchups.push(matchup);
        }
        return matchups;
    }
    // Add A Team to a matchup then remove it from the original teams array
    assignTeam(matchup, teams) {
        const team = this.getRandomTeam(teams);
        matchup.addTeam(team);   
        this.removeTeam(teams, team);
    }
    getRandomTeam(teams) {
        let randomIndex = Math.floor(Math.random() * teams.length);
        return teams[randomIndex];
    }
    removeTeam(teams, team) {
        const index = teams.indexOf(team);
        if (index > -1) {
            teams.splice(index, 1);
        }
    }
    addEliminatedTeams(teams, eliminated) {
        for (var te of eliminated) {
            teams.push(te);
        }
    }

    executeRound(matchups, round_number, id, championship) {
        const competitors = [];
        const winners = [];
        const losers = [];
        for (let i = 0; i < matchups.length; i++) {
            const contenders = matchups[i].runMatch(championship);
            winners.push(contenders[0]);
            losers.push(contenders[1]);
        }
        competitors.push(winners, losers);
        return competitors;
    }

    showResults() {
        console.log("\nAll Team Stats After Season " + this.seasonNumber);
        for (var t of this.teams) {
            t.showStats();
        }
    }

    getSeasonNumber() {
        return this.seasonNumber;
    }
    getChampionName() {
        return this.champion[0].name;
    }
    getChampion() {
        return this.champion[0];
    }

    printChampion() {
        console.log("The winner of season " + this.seasonNumber + " is " + this.champion[0].name);
    }

}