import styled from 'styled-components';

interface Props {
  playerPlace: string;
  bestBidPlace: string;
}

export const InfoWrapper = styled.div<Props>`
  position: absolute;
  top: 5px;
  left: 5px;
  color: #ffffff;

  @media (max-width: 500px) {
    top: ${({ playerPlace, bestBidPlace }) => (playerPlace === 'N' && (bestBidPlace === 'S' || bestBidPlace === 'N')) && '140px'};
    top: ${({ playerPlace, bestBidPlace }) => (playerPlace === 'S' && (bestBidPlace === 'S' || bestBidPlace === 'N')) && '140px'};
    top: ${({ playerPlace, bestBidPlace }) => (playerPlace === 'E' && (bestBidPlace === 'E' || bestBidPlace === 'W')) && '140px'};
    top: ${({ playerPlace, bestBidPlace }) => (playerPlace === 'W' && (bestBidPlace === 'E' || bestBidPlace === 'W')) && '140px'};
  }  

  p {
    margin: 0;
  }
`;

export const Img = styled.img`
  width: 12px;
`;