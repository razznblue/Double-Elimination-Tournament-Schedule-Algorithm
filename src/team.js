export class Team {
    constructor(name, high) {
        this.name = name;
        this.setAttackOptions(high);
        this.wins = 0;
        this.losses = 0;
        this.championships = 0;
        this.yearsWon = [];
    }
    setAttackOptions(high) {
        if (high == "1") {
            this.attackOptions = [5, 5, 3, 4, 5, 5, 5, 8, 9, 10];
        } else if (high == "2") {
            this.attackOptions = [4, 4, 4, 4, 5, 7, 8, 8, 9, 10];
        } else {
            this.attackOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        }
    }
    showStats() {
        console.log("\nShowing stats for " + this.name);
        console.log("Total Wins: "+ this.wins);
        console.log("Total Losses: "+ this.losses);
        const winPercent = (this.wins / (this.wins + this.losses)) * 100;
        console.log("Win Percentage: " + winPercent.toFixed(2) + "%" );
        console.log("Total Championships: "+ this.championships);
        this.showYearsWon();
    }
    showYearsWon() {
        if (this.yearsWon.length > 0) {
            console.log("Years Won: ");
            for (const year of this.yearsWon) {
                console.log(" - " + year);
            }
        }
    }

    attackDmg() {
        const options = this.attackOptions;
        const index = Math.floor(Math.random() * options.length);
        return options[index];
    }
    addYearWon(seasonNumber) {
        const year = "season" + seasonNumber;
        this.yearsWon.push(year);
    }
}