import { IncomingMessage } from "http";
import { Player } from "../../types/Player";
import { Button } from "../Button/Button";
import { Match } from "../Match/Match";
import { PlayerInfo } from "../PlayerInfo/PlayerInfo";
import "./Settings.scss";
import { ISettingsState } from "../../types/SettingsState";
import { Status } from "../../types/Status";

type Props = {
    gameState: ISettingsState,
    increaseQuantity: () => void,
    decreaseQuantity: () => void,
    decreaseStep: () => void,
    increaseStep: () => void,
    changeFirstPlayer: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

export const Settings: React.FC<Props> = ({
    gameState,
    increaseQuantity,
    decreaseQuantity,
    decreaseStep,
    increaseStep,
    changeFirstPlayer
})  => {
    const { firstPlayer, step, initialQuantity, status} = gameState;
    return (
        <div className="settings">
            <div className="settings__options">
                <div className="settings__option">
                    <h3 className="settings__option-name">
                        Player Selection:
                    </h3>

                    <label className="settings__radio">
                        <input
                            disabled={status !== Status.Start}
                            type="radio"
                            name="player"
                            value={Player.AI}
                            checked={firstPlayer === Player.AI}
                            onChange={changeFirstPlayer}
                        />
                        🤖
                    </label>

                    <label className="settings__radio">
                        <input
                                                    disabled={status !== Status.Start}
                            type="radio"
                            name="player"
                            value={Player.User}
                            checked={firstPlayer === Player.User}
                            onChange={changeFirstPlayer}
                        />
                        👦
                    </label>
                </div>
                <div className="settings__option">
                    <h3 className="settings__option-name">
                        Match Quantity:
                    </h3>

                    <div className="settings__quantity">
                        {initialQuantity}
                        <Button disabled={status !== Status.Start} action={decreaseQuantity} small>
                        ➖

                </Button>
                        <Button disabled={status !== Status.Start} action={increaseQuantity} small>
                        ➕

                </Button>
                    </div>
                </div>
                <div className="settings__option">
                    <h3 className="settings__option-name">
                        Max Matches per Turn:
                    </h3>

                    <div className="settings__quantity">
                        {step}
                        <Button disabled={status !== Status.Start} action={decreaseStep} small>
                        ➖

                </Button>
                        <Button disabled={status !== Status.Start} action={increaseStep} small>
                        ➕

                </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
