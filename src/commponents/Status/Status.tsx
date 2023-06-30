import {ReactNode} from 'react';
import './Status.scss';

type Props = {
    children: ReactNode;
}

export const Status: React.FC<Props> = ({
    children
}) => {
    return (
        <div className='status'>
            {children}
        </div>
    )
} 