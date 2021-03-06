export class Team {
    constructor(name) {
        this.name = name;
        this.attackOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.wins = 0;
        this.losses = 0;
        this.championships = 0;
    }
    printName() {
        console.log(this.name);
    }

    attackDmg() {
        const options = this.attackOptions;
        const index = Math.floor(Math.random() * options.length);
        return options[index];
    }
}