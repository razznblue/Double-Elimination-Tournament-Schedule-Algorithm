export class Team {
    constructor(name, high) {
        this.name = name;
        if (high == "1") {
            this.attackOptions = [5, 5, 3, 4, 5, 5, 5, 8, 9, 10];
        } else if (high == "2") {
            this.attackOptions = [4, 4, 4, 4, 5, 7, 8, 8, 9, 10];
        } else {
            this.attackOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        }
        this.wins = 0;
        this.losses = 0;
        this.championships = 0;
    }
    printName() {
        console.log(this.name);
    }
    showStats() {
        console.log("\nShowing stats for " + this.name);
        console.log("Total Wins: "+ this.wins);
        console.log("Total Losses: "+ this.losses);
        const winPercent = (this.wins / (this.wins + this.losses)) * 100;
        console.log("Win Percentage: " + winPercent.toFixed(2) + "%" );
        console.log("Total Championships: "+ this.championships);
    }

    attackDmg() {
        const options = this.attackOptions;
        const index = Math.floor(Math.random() * options.length);
        return options[index];
    }
}