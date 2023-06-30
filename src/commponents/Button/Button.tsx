import {ReactNode} from 'react';
import classNames from 'classnames';
import './Button.scss';

type Props = {
    children: ReactNode;
    action?: () => void;
    small?: boolean,
    active?: boolean,
    disabled?: boolean
    long?: boolean
}

export const Button: React.FC<Props> = ({
    children,
    action,
    small,
    active,
    disabled,
    long
}) => {
    return (
        <button
            disabled={disabled}
            onClick={action}
            className={classNames(
                'button',
                {
                    'button--small': small,
                    'button--active': active,
                    'button--long': long,
                }
            )}
        >
            {children}
        </button>
    )
};
