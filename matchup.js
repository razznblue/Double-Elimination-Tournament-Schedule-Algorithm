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

    runMatch() {
        const team1atk = this.team1.attackDmg();
        const team2atk = this.team2.attackDmg();
        while (this.team1Points != 3 || this.team2Points != 3) {
            this.attemptScore(team1atk, team2atk);
        }
        return this.getWinner();
    }

    attemptScore(team1atk, team2atk) {
        if (team1atk < team2atk) {
            this.team2Points++;
        } else if (team1atk > team2atk) {
            this.team1Points++;
        } else {
            break;
        }
    }

    getWinner() {
        if (this.team1Points === 3) {
            return this.teams[0];
        } else {
            return this.teams[1];
        }
    }
}