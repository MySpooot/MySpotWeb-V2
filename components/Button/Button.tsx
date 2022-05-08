import React, { FC, ButtonHTMLAttributes } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { Color } from '@/constants';

type ButtonType = 'primary' | 'bordered' | 'default';
type Props = { type?: ButtonType; popup?: boolean; rounded?: boolean; fullWidth?: boolean };
interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>, Props {}

const Button: FC<ButtonProps> = ({ type = 'default', popup = false, rounded = false, fullWidth = true, children, ...props }) => (
    <Container fullWidth={fullWidth} popup={popup} rounded={rounded} type_={type} {...props}>
        {children}
    </Container>
);

const Container = styled.button<Required<Omit<Props, 'type'>> & { type_: ButtonType }>`
    display: flex;
    width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
    height: ${({ popup }) => (popup ? '3.375rem' : '4.125rem')};
    align-items: center;
    justify-content: center;
    padding: 0.75rem;
    border-radius: ${({ rounded }) => (rounded ? '2.8125rem' : '0.25rem')};
    font-size: 1rem;
    font-weight: 500;
    user-select: none;

    ${props => {
        switch (props.type_) {
            case 'primary':
                return css`
                    background-color: ${Color.blue};
                    color: ${Color.white};
                `;
            case 'bordered':
                return css`
                    background-color: none;
                    color: ${Color.blue};
                    border: 1px solid ${Color.blue};
                `;
            default:
                return css`
                    background-color: ${Color.white};
                    color: ${Color.grey[600]};
                    border: 1px solid ${Color.grey[300]};
                `;
        }
    }}

    :disabled {
        border: unset;
        background-color: ${Color.grey[100]};
        color: ${Color.grey[600]};
    }
`;

export default Button;
