import { useState, useEffect } from "react";
import "./App.scss";
import { openaiApi } from "./api";
import { Status } from "./commponents/Status/Status";
import { Button } from "./commponents/Button/Button";
import { Field } from "./commponents/Field/Field";
import { Settings } from "./commponents/Settings/Settings";
import { makeMessage } from "./utils/makeMessage";
import {
    MAX_MATCH_AMOUNT,
    MAX_STEP,
    MIN_MATCH_AMOUNT,
    MIN_STEP,
} from "./utils/constants";
import {
    ISettingsState,
    IGameState,
    Status as StatusType,
    Player,
} from "./types";

const initialSettingsState: ISettingsState = {
    status: StatusType.Start,
    initialQuantity: 25,
    step: 4,
    firstPlayer: Player.User,
};

const initialGameState: IGameState = {
    aiNumber: 0,
    userNumber: 0,
    aiPoints: 0,
    userPoints: 0,
    currentQuantity: 25,
    turn: Player.User,
};

function App() {
    const [gameState, setGameState] = useState<IGameState>(initialGameState);
    const [settingsState, setSettingsState] = useState<ISettingsState>(initialSettingsState);
    const { firstPlayer, step, initialQuantity, status } = settingsState;
    const { aiPoints, currentQuantity, turn } = gameState;
    const isGameStarted = status !== StatusType.Start;

    const aiTakesMatches = (amount: number) => {
        setTimeout(() => {
            openaiApi(makeMessage(currentQuantity, step, turn, amount)).then(
                (res) => {
                    setGameState((prev) => ({
                        ...prev,
                        aiNumber: +res > step ? 1 : +res,
                        aiPoints: prev.aiPoints + (+res > step ? 1 : +res),
                        currentQuantity: prev.currentQuantity - (+res > step ? 1 : +res),
                        turn: Player.User,
                    }));

                    setSettingsState((prev) => ({
                        ...prev,
                        status: StatusType.UserTurn,
                    }));
                }
            );
        }, 1000);
    };

    const userTakesMatches = (amount: number) => {
        setGameState((prev) => ({
            ...prev,
            userNumber: amount,
            userPoints: prev.userPoints + amount,
            currentQuantity: prev.currentQuantity - amount,
            turn: Player.AI,
        }));

        setSettingsState((prev) => ({
            ...prev,
            status: StatusType.AITurn,
        }));

        if (currentQuantity - amount <= 0) {
            return;
        }

        aiTakesMatches(amount);
    };

    useEffect(() => {
        if (currentQuantity <= 0) {
            setSettingsState((prev) => ({
                ...prev,
                status:
                    aiPoints % 2 === 0 ? StatusType.AIWinner : StatusType.UserWinner,
            }));

            setTimeout(() => {
                setGameState((prev) => ({
                    ...prev,
                    aiPoints: 0,
                    userPoints: 0,
                    currentQuantity: initialQuantity,
                    turn: Player.User,
                }));

                setSettingsState((prev) => ({
                    ...prev,
                    status:
                        firstPlayer === Player.AI ? StatusType.AITurn : StatusType.UserTurn,
                }));

                if (firstPlayer === Player.AI) {
                    aiTakesMatches(0);
                }
            }, 5000);
        }
    }, [currentQuantity]);

    const increaseQuantity = () => {
        if (initialQuantity === MAX_MATCH_AMOUNT) {
            return;
        }

        setSettingsState((prev) => ({
            ...prev,
            initialQuantity: prev.initialQuantity + 2,
        }));

        setGameState((prev) => ({
            ...prev,
            currentQuantity: prev.currentQuantity + 2,
        }));
    };

    const decreaseQuantity = () => {
        const isQuantityLessThanStep = initialQuantity - 2 <= step;

        if (initialQuantity === MIN_MATCH_AMOUNT || isQuantityLessThanStep) {
            return;
        }

        setSettingsState((prev) => ({
            ...prev,
            initialQuantity: prev.initialQuantity - 2,
        }));

        setGameState((prev) => ({
            ...prev,
            currentQuantity: prev.currentQuantity - 2,
        }));
    };

    const startGame = () => {
        setSettingsState((prev) => ({
            ...prev,
            status:
                prev.firstPlayer === Player.AI
                    ? StatusType.AITurn
                    : StatusType.UserTurn,
        }));

        if (firstPlayer === Player.AI) {
            aiTakesMatches(0);
        }
    };

    const resetGame = () => {
        setSettingsState((prev) => ({
            ...prev,
            status: StatusType.Start,
        }));

        setGameState({
            ...initialGameState,
            currentQuantity: initialQuantity
        });
    };

    const increaseStep = () => {
        setSettingsState((prev) => ({
            ...prev,
            step: prev.step === MAX_STEP ? prev.step : prev.step + 1,
        }));
    };

    const decreaseStep = () => {
        setSettingsState((prev) => ({
            ...prev,
            step: prev.step === MIN_STEP ? prev.step : prev.step - 1,
        }));
    };

    const changeFirstPlayer = () => {
        setSettingsState((prev) => ({
            ...prev,
            firstPlayer: prev.firstPlayer === Player.AI ? Player.User : Player.AI,
        }));
    };

    return (
        <div className="App">
            <Field
                settingsState={settingsState}
                gameState={gameState}
                userTakesMatches={userTakesMatches}
            />

            <div className="App__sidebar">
                <Status>{status}</Status>

                <div className="App__buttons">
                    {!isGameStarted && <Button long action={startGame}>Start</Button>}
                    {isGameStarted && <Button long action={resetGame}>Reset </Button>}
                </div>

                <Settings
                    gameState={settingsState}
                    increaseQuantity={increaseQuantity}
                    decreaseQuantity={decreaseQuantity}
                    increaseStep={increaseStep}
                    decreaseStep={decreaseStep}
                    changeFirstPlayer={changeFirstPlayer}
                />
            </div>
        </div>
    );
}

export default App;
