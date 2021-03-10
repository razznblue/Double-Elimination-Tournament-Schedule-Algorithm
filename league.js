import { Season } from "./season.js";

export class League {
    constructor(name, teams) {
        this.name = name;
        this.teams = teams;
        this.seasons = [];
        this.champions = [];
        this.numberOfSeasons = 5;
    }
    start() {
        for (let i = 1; i < this.numberOfSeasons + 1; i++) {
            const season = new Season(this.teams, i);
            season.start();
            this.updateLeague(season);
            if (i === this.numberOfSeasons) {
                //season.showResults();
            }
        }
    }

    updateLeague(season) {
        if (season instanceof Season === true) {
            this.seasons.push(season);
            this.champions.push(season.getChampion());
        }
    }
    addSeason(season) {
        if (this.seasons.length > -1) {
            this.seasons.push(season);
        }
    }

    getAllChampions() {
        const champions = [];
        for (var s of this.seasons) {
            const record = s.getChampionName() + " - " + s.getSeasonNumber();
            champions.push(record);
        }
        return champions;
    }
}