import styled, { css } from 'styled-components';

const colors = {
  S: '#00cc00',
  H: '#ff3300',
  C: '#999999',
  D: '#ff9900',
  NT: '#0000ff',
};

const background = {
  S: '#ccffcc',
  H: '#ffd6cc',
  C: '#d9d9d9',
  D: '#ffebcc',
  NT: '#ccccff',
};

const positions = (pos: string, pos2: string, margin: number) => {
  const position = {
    N: {
      N: css`
        bottom: 90px;
        left: 50%;
        transform: rotate(90deg) translate(0, ${-margin + 'px'});

        @media (max-width: 600px) {
          bottom: 70px;
        }
      `,
      S: css`
        top: 90px;
        left: 50%;
        transform: rotate(-90deg) translate(0, ${-margin + 'px'});

        @media (max-width: 600px) {
          top: 70px;
        }
      `,
      E: css`
        top: 50%;
        right: 90px;
        transform: translate(0, ${-margin + 'px'});

        @media (max-width: 600px) {
          right: 70px;
        }
      `,
      W: css`
        top: 50%;
        left: -110px;
        transform: translate(0, ${-margin + 'px'});

        @media (max-width: 600px) {
          left: -130px;
        }

        > div {
          text-align: right;
        }
      `,
    },
    S: {
      N: css`
        top: 90px;
        left: 50%;
        transform: rotate(-90deg) translate(0, ${-margin + 'px'});

        @media (max-width: 600px) {
          top: 70px;
        }
      `,
      S: css`
        bottom: 90px;
        left: 50%;
        transform: rotate(90deg) translate(0, ${-margin + 'px'});

        @media (max-width: 600px) {
          bottom: 70px;
        }
      `,
      E: css`
        top: 50%;
        left: -110px;
        transform: translate(0, ${-margin + 'px'});

        @media (max-width: 600px) {
          left: -130px;
        }

        > div {
          text-align: right;
        }
      `,
      W: css`
        top: 50%;
        right: 90px;
        transform: translate(0, ${-margin + 'px'});

        @media (max-width: 600px) {
          right: 70px;
        }
      `,
    },
    E: {
      N: css`
        top: 50%;
        right: 90px;
        transform: translate(0, ${-margin + 'px'});

        @media (max-width: 600px) {
          right: 70px;
        }
      `,
      S: css`
        top: 50%;
        left: -110px;
        transform: translate(0, ${-margin + 'px'});

        @media (max-width: 600px) {
          left: -130px;
        }

        > div {
          text-align: right;
        }
      `,
      E: css`
        bottom: 90px;
        left: 50%;
        transform: rotate(90deg) translate(0, ${-margin + 'px'});

        @media (max-width: 600px) {
          bottom: 70px;
        }
      `,
      W: css`
        top: 90px;
        left: 50%;
        transform: rotate(-90deg) translate(0, ${-margin + 'px'});

        @media (max-width: 600px) {
          top: 70px;
        }
      `,
    },
    W: {
      N: css`
        top: 50%;
        left: -110px;
        transform: translate(0, ${-margin + 'px'});

        @media (max-width: 600px) {
          left: -130px;
        }

        > div {
          text-align: right;
        }
      `,
      S: css`
        top: 50%;
        right: 90px;
        transform: translate(0, ${-margin + 'px'});

        @media (max-width: 600px) {
          right: 70px;
        }
      `,
      E: css`
        top: 90px;
        left: 50%;
        transform: rotate(-90deg) translate(0, ${-margin + 'px'});

        @media (max-width: 600px) {
          top: 70px;
        }
      `,
      W: css`
        bottom: 90px;
        left: 50%;
        transform: rotate(90deg) translate(0, ${-margin + 'px'});

        @media (max-width: 600px) {
          bottom: 70px;
        }
      `,
    },
  };

  return position[pos][pos2];
};

export const BiddingCardsWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

export const BiddingCardsContent = styled.div<{ playerPosition: string, bidPlace: string; margin: number }>`
  position: absolute;
  ${({ playerPosition, bidPlace, margin }) => positions(playerPosition, bidPlace, margin)};
`;

export const BiddingCard = styled.div<{ top: number; pass: boolean; x: boolean; xx: boolean }>`
  position: absolute;
  width: 200px;
  background: #ffffff;
  border: 1px solid #000000;
  border-radius: 5px;
  font-size: 20px;
  font-weight: bold;
  padding: 5px 5px 50px 5px;
  background-color: ${({ color }) => background[color]};
  background-color: ${({ pass }) => pass && '#009933'};
  background-color: ${({ x }) => x && '#e62e00'};
  background-color: ${({ xx }) => xx && '#0000e6'};
  top: ${({ top }) => `${top}px`};
`;

export const CardValue = styled.div<{ color: string }>`
  color: ${({ color }) => colors[color]};
`;

export const Img = styled.img`
  width: 15px;
`;

export const PassCard = styled.div`
  color: #ffffff;
`;

export const DoubledCard = styled.div`
  color: #ffffff;
`;

export const RedoubledCard = styled.div`
  color: #ffffff;
`;