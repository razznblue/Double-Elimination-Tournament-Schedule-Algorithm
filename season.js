import { Team } from "./team.js";
import { Matchup } from "./matchup.js";

export class Season {
    constructor(teams, number) {
        this.teams = teams;
        this.seasonNumber = number + 1;
    }
}