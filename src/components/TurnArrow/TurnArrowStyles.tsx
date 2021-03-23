import styled, { css } from "styled-components";

interface Props {
  position?: string;
}

const positionStyles = {
  BOTTOM: css`
    transform: translate(-50%,-50%) rotate(90deg);
  `,
  TOP: css`
    transform: translate(-50%,-50%) rotate(-90deg);
  `,
  LEFT: css`
    transform: translate(-50%,-50%) rotate(180deg);
  `,
  RIGHT: css`
    transform: translate(-50%,-50%);
  `,
}

export const ArrowWrapperStyles = styled.div<Props>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80px;
  height: 60px;
  cursor: pointer;

  ${({ position }) => positionStyles[position]}
`;

export const ArrowStyles = styled.div`
  position: absolute;
  top: 25px;
  width: 90%;
  height: 5px;
  background-color: #fff;
  box-shadow: 0 3px 5px rgba(0, 0, 0, .2);

  ::before, ::after {
    content: '';
    position: absolute;
    width: 53%;
    height: 5px;
    right: -8px;
    background-color: #fff;
  }

  ::after {
    top: -12px;
    transform: rotate(45deg);
  }

  ::before {
    top: 12px;
    box-shadow: 0 3px 5px rgba(0, 0, 0, .2);
    transform: rotate(-45deg);
  }
`;