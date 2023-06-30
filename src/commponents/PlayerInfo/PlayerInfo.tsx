import { Player } from '../../types/Player';
import './PlayerInfo.scss';

type Props = {
    player: Player,
    icon: string,
    pointAmount: number
}

export const PlayerInfo: React.FC<Props> = ({
    player,
    icon,
    pointAmount
}) => {
    return (
        <div className='player-info'>
            <div className='player-info__icon'>
                {icon}
            </div>

            <div className='player-info__points'>
                {pointAmount}
            </div>
        </div>
    )
} 