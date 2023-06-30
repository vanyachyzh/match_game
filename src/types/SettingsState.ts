import { Player } from "./Player";
import { Status } from "./Status";

export interface ISettingsState {
    status: Status,
    initialQuantity: number,
    step: number,
    firstPlayer: Player
}
