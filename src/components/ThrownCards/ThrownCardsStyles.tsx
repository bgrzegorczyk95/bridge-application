import styled, { css } from "styled-components";

interface Props {
  position: string;
}

export const WrapperStyles = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 400px;

  ::before, ::after {
    display: block;
    content: "";
    width: 30%;
    height: 30%;
    position: absolute;
  }

  ::before {
    top: -2px;
    left: -2px;
    border-top: 2px solid #525252;
    border-left: 2px solid #525252;
  }

  ::after {
    top: -2px;
    right: -2px;
    border-top: 2px solid #525252;
    border-right: 2px solid #525252;
  }
`;

export const BorderStyles = styled.div`
  ::before, ::after {
    display: block;
    content: "";
    width: 30%;
    height: 30%;
    position: absolute;
  }

  ::before {
    bottom: -2px;
    left: -2px;
    border-bottom: 2px solid #525252;
    border-left: 2px solid #525252;
  }

  ::after {
    bottom: -2px;
    right: -2px;
    border-bottom: 2px solid #525252;
    border-right: 2px solid #525252;
  }
`;

const positionsStyles = {
  BOTTOM: css`
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  `,
  TOP: css`
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  `,
  LEFT: css`
    top: calc(50% - 25px);
    left: 25px;
    transform: rotate(90deg) translateX(-50%);
  `,
  RIGHT: css`
    top: calc(50% - 25px);
    right: 25px;
    transform: rotate(90deg) translateX(-50%);
  `,
}

export const CardWrapperStyles = styled.div<Props>`
  position: absolute;
  width: 100px;
  height: 150px;
  border-radius: 5px;

  ${({ position }) => positionsStyles[position]};
`;

export const CardStyles = styled.img`
  width: 100%;
  height: 100%;
`;