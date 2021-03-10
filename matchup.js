export class Matchup {
    constructor() {
        this.teams = [];
        this.team1Points = 0;
        this.team2Points = 0;
    }

    addTeam(team) {
        if (this.teams.length < 2) {
            this.setTeamAsProperty(team);
            this.teams.push(team);
        }
    }
    setTeamAsProperty(team) {
        if (this.team1 != undefined) {
            this.team2 = team;
        } else {
            this.team1 = team;
        }
    }

    runMatch(championship) {
        //console.log("Match between... " + this.teams[0].name + " and " + this.teams[1].name);
        while (true) {
            this.attemptScore();
            if (this.team1Points === 3 || this.team2Points === 3) {
                break;
            }
        }
        return this.getWinner(championship);
    }

    attemptScore() {
        const team1atk = this.team1.attackDmg();
        //console.log(this.teams[0].name + " attack: " + team1atk);
        const team2atk = this.team2.attackDmg();
        //console.log(this.teams[1].name + " attack: " + team2atk);
        if (team1atk < team2atk) {
            //console.log(this.teams[1].name + " scored");
            this.team2Points++;
        } else if (team1atk > team2atk) {
            //console.log(this.teams[0].name + " scored");
            this.team1Points++;
        } else {
            //console.log("no score");
            //this.attemptScore(team1atk, team2atk);
        }
    }
    getWinner(isFinalGame) {
        const contenders = [];
        if (this.team1Points === 3) {
            return this.getContenders(contenders, this.team1, this.team2, isFinalGame);
        } else {
            return this.getContenders(contenders, this.team2, this.team1, isFinalGame);
        }
    }
    getContenders(contenders, winner, loser, isFinalGame) {
        contenders.push(winner, loser);
        winner.wins++;
        loser.losses++;
        if (isFinalGame === true) {
            winner.championships++;
        }
        return contenders;
    }
}