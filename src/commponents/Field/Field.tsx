import './Field.scss';
import { convertNumberToArray } from '../../utils/convertNumberToArray';
import { Player } from '../../types/Player';
import { Button } from '../Button/Button';
import { Match } from '../Match/Match';
import { PlayerInfo } from '../PlayerInfo/PlayerInfo';
import { IGameState, Status, ISettingsState } from '../../types';

type Props = {
    settingsState: ISettingsState
    gameState: IGameState
    userTakesMatches: (amount: number) => void
}

export const Field: React.FC<Props> = ({ gameState, userTakesMatches, settingsState }) => {
    const { currentQuantity, aiPoints, userPoints, turn, aiNumber, userNumber } = gameState;
    const { step, status } = settingsState;
    const isAITurn = Player.User !== turn;
    const isGameStarted = status === Status.Start;


    return (
        <div className='field'>
            <PlayerInfo
                player={Player.AI}
                pointAmount={aiPoints}
                icon='🤖'
            />

            <div className='field__buttons'>
                {convertNumberToArray(step).map((_, index) => (
                    <Button
                        disabled
                        active={index + 1 === aiNumber}
                        key={index}
                    >
                        {index + 1}
                    </Button>
                ))}
            </div>

            <div className='field__pile'>
                {convertNumberToArray(currentQuantity).map((_, index) => (
                    <Match key={index} />
                ))}
            </div>

            <PlayerInfo
                player={Player.User}
                pointAmount={userPoints}
                icon='👦'
            />

            <div className='field__buttons'>
                {convertNumberToArray(step).map((_, index) => (
                    <Button
                        disabled={isAITurn || currentQuantity - index - 1 < 0 || isGameStarted}
                        active={userNumber === index + 1}
                        key={index}
                        action={() => userTakesMatches(index + 1)}
                    >
                        {index + 1}
                    </Button>
                ))}
            </div>
        </div>
    )
}