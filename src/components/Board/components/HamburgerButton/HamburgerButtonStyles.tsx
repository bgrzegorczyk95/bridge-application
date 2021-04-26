import styled from 'styled-components';

interface Props {
  isClose: boolean;
}

export const HamburgerButtonWrapper = styled.div`
  display: inline-block;
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 10px;
  z-index: 5;

  @media (min-width: 1001px) {
    display: none;
  }
`;

export const BarOne = styled.div<Props>`
  width: 35px;
  height: 5px;
  background-color: #ffffff;
  margin: 6px 0;
  transition: 0.4s;
  transform: ${({ isClose }) => isClose && 'rotate(-45deg) translate(-8px, 7px)'};
`;

export const BarTwo = styled.div<Props>`
  width: 35px;
  height: 5px;
  background-color: #ffffff;
  margin: 6px 0;
  transition: 0.4s;
  opacity: ${({ isClose }) => isClose && '0'};
`;

export const BarThree = styled.div<Props>`
  width: 35px;
  height: 5px;
  background-color: #ffffff;
  margin: 6px 0;
  transition: 0.4s;
  transform: ${({ isClose }) => isClose && 'rotate(45deg) translate(-8px, -8px)'};
`;