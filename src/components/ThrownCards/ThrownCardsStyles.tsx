import styled, { css, FlattenSimpleInterpolation } from "styled-components";

interface Props {
  position: string;
}

const positions: { [key: string]: { [key: string]: string } } = {
  N: {
    E: '38%',
    W: '61%',
  },
  S: {
    E: '61%',
    W: '38%',
  },
  E: {
    N: '61%',
    S: '38%',
  },
  W: {
    N: '38%',
    S: '61%',
  },
};

export const WrapperStyles = styled.div<{ trumpPlace: string; playerPlace: string; }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 330px;
  height: 330px;
  transform: translate(-50%, -50%);

  @media (max-width: 600px) {
    width: 200px;
    height: 210px;
    left: ${({ trumpPlace, playerPlace }) => positions[playerPlace][trumpPlace]};
  }
`;

const positionsStyles: { [key: string]: FlattenSimpleInterpolation } = {
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

  @media (max-width: 500px) {
    width: 60px;
    height: 90px;
  }

  ${({ position }) => positionsStyles[position]};
`;

export const CardStyles = styled.img`
  width: 100%;
  height: 100%;
`;
