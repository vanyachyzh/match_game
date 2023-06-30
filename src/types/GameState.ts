import { Player } from "./Player";

export interface IGameState {
    aiNumber: number,
    userNumber: number,
    aiPoints: number,
    userPoints: number,
    currentQuantity: number,
    turn: Player,
};
