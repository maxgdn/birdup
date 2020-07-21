import * as React from 'react';
import styled from 'styled-components';
import {colors} from '../../core';

interface ButtonProps {
    name: string;
    icon?: React.ReactElement;
}

const ButtonElement = styled.button`
    background: ${colors.primary};
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;

    border-color: ${colors.secondary};
    border-width: medium;
    text-decoration: none;
    color: ${colors.tertiary};

    font-weight: bold;

    padding: 0.5rem;

    &:hover {
        transform: scale(1.05);
    }
`;

const Button: React.FC<ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
    return (
        <ButtonElement {...props}>{props.icon !== null ? React.cloneElement(props.icon, {color: colors.tertiary}) : null} {props.name}</ButtonElement>
    );
}

export default Button;