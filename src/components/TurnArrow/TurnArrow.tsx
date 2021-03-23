import React from 'react';
import { ArrowStyles, ArrowWrapperStyles } from './TurnArrowStyles';

interface Props {
  position: string;
}

export const TurnArrow = ({ position }: Props) => (
  <ArrowWrapperStyles position={position}>
    <ArrowStyles />
  </ArrowWrapperStyles>
)