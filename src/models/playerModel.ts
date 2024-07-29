import { User } from "./userModel";

export interface VoteGiven {
    first: string,
    second: string,
    third: string,
    fourth: string
}


export interface Player extends User {
    voteGiven: VoteGiven
}

interface PlayerAttribute {
    hand: "Left" | "Right",
    style: "Attack" | "Defence" | "Balanced"
    details: string
}

export interface PlayerSeed extends PlayerAttribute {
    name: string
    score: number
}