import React from 'react';
import { BarOne, BarThree, BarTwo, HamburgerButtonWrapper } from './HamburgerButtonStyles';

interface Props {
  isVisible: boolean;
  handleChange: any;
}

export const HamburgerButton = ({ isVisible, handleChange }: Props) => {

  return (
    <HamburgerButtonWrapper onClick={handleChange}>
      <BarOne isClose={isVisible} />
      <BarTwo isClose={isVisible} />
      <BarThree isClose={isVisible} />
    </HamburgerButtonWrapper>
  );
};
