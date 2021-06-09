import styled from 'styled-components';

interface Props {
  playerPlace: string;
  trumpPlace: string;
}

export const InfoWrapper = styled.div<Props>`
  position: absolute;
  top: 5px;
  left: 5px;
  color: #ffffff;

  @media (max-width: 500px) {
    top: ${({ playerPlace, trumpPlace }) => (playerPlace === 'N' && (trumpPlace === 'S' || trumpPlace === 'N')) && '140px'};
    top: ${({ playerPlace, trumpPlace }) => (playerPlace === 'S' && (trumpPlace === 'S' || trumpPlace === 'N')) && '140px'};
    top: ${({ playerPlace, trumpPlace }) => (playerPlace === 'E' && (trumpPlace === 'E' || trumpPlace === 'W')) && '140px'};
    top: ${({ playerPlace, trumpPlace }) => (playerPlace === 'W' && (trumpPlace === 'E' || trumpPlace === 'W')) && '140px'};
  }  

  p {
    margin: 0;
  }
`;

export const Img = styled.img`
  width: 12px;
`;
