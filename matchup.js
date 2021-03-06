export class Matchup {
    constructor() {
        this.teams = [];
        this.team1Points = 0;
        this.team2Points = 0;
    }

    addTeam(team) {
        if (this.teams.length < 2) {
            this.teams.push(team);
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
        const team1atk = this.teams[0].attackDmg();
        //console.log(this.teams[0].name + " attack: " + team1atk);
        const team2atk = this.teams[1].attackDmg();
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

    getWinner(championship) {
        //You are actually returning both winner and loser. (Except if it's the championship game)
        //The winner will be put in the first posiiton of the returned array[0]
        const contenders = [];
        if (this.team1Points === 3) {
            contenders.push(this.teams[0]);
            contenders.push(this.teams[1]);
            if (championship === true) {
                this.teams[0].championships++;
            }
            this.teams[0].wins++;
            this.teams[1].losses++;
            return contenders;
        } else {
            contenders.push(this.teams[1]);
            contenders.push(this.teams[0]);
            if (championship === true) {
                this.teams[1].championships++;
            }
            this.teams[1].wins++;
            this.teams[0].losses++;
            return contenders;
        }
    }
}