import { Player } from "../types/Player";

function generateString(number: number): string {
    const options: string[] = Array.from({ length: number }, (_, i) => (i + 1).toString());
    
    return options.join(' or ');
}

export const makeMessage = (quantity: number, step: number, turn: Player, myNumber?: number) => {
    return `We are playing a game with you. We have ${quantity} matches. You can take up ${step <= quantity ? generateString(step) : quantity - 1} matches in one step. The winner is the one who has an even number of matches left at the end. Now it's ${turn === Player.AI ? 'your' : 'my'} turn. ${turn === Player.AI ? '' : 'My number is ' + myNumber} Write only a number and I will answer you the same way`
};