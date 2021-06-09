import styled, { css, FlattenSimpleInterpolation } from "styled-components";

interface Props {
  position?: string;
  trumpPlace: string;
  playerPlace: string;
}

const arrowPositionStyles = (pos: string, trumpPlace: string, playerPlace: string): FlattenSimpleInterpolation => {
  const position: { [key: string]: FlattenSimpleInterpolation } = {
    BOTTOM: css`
      left: 50%;
      bottom: 100px;
      border-left: 13px solid transparent;
      border-right: 13px solid transparent;
      border-top: 25px solid #ffffff;

      @media (max-width: 600px) {
        bottom: 70px;
      }
    `,
    TOP: css`
      left: 50%;
      top: 100px;
      border-left: 13px solid transparent;
      border-right: 13px solid transparent;
      border-bottom: 25px solid #ffffff;

      @media (max-width: 600px) {
        top: ${trumpPlace === playerPlace ? '70px' : '0'};
      }
    `,
    LEFT: css`
      left: 130px;
      top: 45%;
      border-top: 13px solid transparent;
      border-bottom: 13px solid transparent;
      border-right: 25px solid #ffffff;

      @media (max-width: 600px) {
        left: ${trumpPlace === playerPlace ? '100px' : '25px'};
      }
    `,
    RIGHT: css`
      right: 130px;
      top: 45%;
      border-top: 13px solid transparent;
      border-bottom: 13px solid transparent;
      border-left: 25px solid #ffffff;

      @media (max-width: 600px) {
        right: ${trumpPlace === playerPlace ? '100px' : '25px'};
      }
    `,
  };

  return position[pos];
}

export const ArrowWrapperStyles = styled.div<Props>`
  position: absolute;
  width: 0;
  height: 0;
  margin: 30px auto;
  cursor: pointer;

  ${({ position, trumpPlace, playerPlace }) => arrowPositionStyles(position, trumpPlace, playerPlace)};
`;
