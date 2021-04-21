import styled, { css } from "styled-components";

interface Props {
  position: string;
}

export const WrapperStyles = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 330px;
  height: 330px;
`;

export const BorderStyles = styled.div`
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
  width: 80px;
  height: 110px;
  border-radius: 5px;

  ${({ position }) => positionsStyles[position]};
`;

export const CardStyles = styled.img`
  width: 100%;
  height: 100%;
`;