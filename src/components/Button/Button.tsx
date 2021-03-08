import React from 'react';
import { ButtonStyles } from './ButtonStyles';

interface Props {
  type?: "button" | "submit" | "reset"
  name: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Button = ({ type = 'button', name, onClick }: Props) => (
  <ButtonStyles type={type} onClick={onClick}>
    {name}
  </ButtonStyles>
);