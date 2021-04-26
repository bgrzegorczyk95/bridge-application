import styled, { css } from 'styled-components';

const cardsPosition = (isVisible, position: string) => {
  const positions = {
    BOTTOM: css`
      bottom: 65px;
      transform: translateX(-110px);

      @media (max-width: 600px) {
        bottom: 50px;
      }
    `,
    TOP: css`
      top: 65px;
      transform: translateX(-110px);

      @media (max-width: 600px) {
        transform: ${!isVisible && 'none'};
        top: 60px;
      }
    `,
    LEFT: css`
      left: 65px;
      transform: rotate(90deg) translateX(-110px);

      @media (max-width: 600px) {
        transform: ${!isVisible && 'none'};
        left: 50px;
      }
    `,
    RIGHT: css`
      right: 65px;
      transform: rotate(90deg) translateX(-110px);

      @media (max-width: 600px) {
        transform: ${!isVisible && 'none'};
        right: 58px;
      }
    `,
  };

  return positions[position];
}

const playerNamePosition = (isVisible, position: string) => {
  const positions =  {
    BOTTOM: css`
      bottom: 60px;

      @media (max-width: 600px) {
        bottom: ${isVisible ? '60px' : '10px'};
      }
    `,
    TOP: css`
      top: 65px;

      @media (max-width: 600px) {
        top: ${isVisible ? '60px' : '-50px'};
      }
    `,
    LEFT: css`
      bottom: 90px;
      transform: rotate(270deg);
      overflow: hidden;
      max-width: 80px;
      text-overflow: ellipsis;
      white-space: nowrap;

      @media (max-width: 600px) {
        bottom: ${isVisible ? '90px' : '50%'};
        transform: ${!isVisible && 'translate(-8px, 0)'};
      }
    `,
    RIGHT: css`
      top: 90px;
      transform: rotate(270deg);
      overflow: hidden;
      max-width: 80px;
      text-overflow: ellipsis;
      white-space: nowrap;

      @media (max-width: 600px) {
        top: ${isVisible ? '90px' : '50%'};
        transform: ${!isVisible && 'translate(25px, -100%)'};
      }
    `,
  };

  return positions[position];
}

export const CardWrapper = styled.div<any>`
  width: 80px;
  height: 110px;
  position: absolute;
  overflow: hidden;
  margin-left: ${({ margin }) => margin};

  @media (max-width: 600px) {
    display: ${({ isVisible }) => !isVisible && 'none'};
  }

  @media (max-width: 500px) {
    width: 60px;
    height: 90px;
  }

  :hover {
    margin-bottom: ${({ isVisible }) => isVisible && '10px'};
  }
`;

export const CardsWrapper = styled.div<any>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;

  ${({ isVisible, position }) => cardsPosition(isVisible, position)};
`;

export const SingleCard = styled.img<any>`
  width: 100%;
  height: 100%;
  cursor: pointer;
  position: relative;

  @media (max-width: 600px) {
    display: ${({ position, isVisible }) => ((position !== 'BOTTOM' && !isVisible) && 'none')};
  }
`;

export const SignTopLeft = styled.span`
  position: absolute;
  left: 10px;
  top: 10px;
  font-size: 20px;
  font-weight: bold;
`;

export const SignBottomRight = styled.span`
  position: absolute;
  right: 10px;
  bottom: 10px;
  font-size: 20px;
  font-weight: bold;
`;

export const PlayerName = styled.div<any>`
  position: ${({ position }) => position ? 'absolute' : 'relative'};
  color: #ffffff;
  font-weight: bold;
  white-space: nowrap;
  
  ${({ isVisible, position }) => playerNamePosition(isVisible, position)};
`;

export const PlayerNameInitial = styled.div<any>`
  position: absolute;
  color: #ffffff;
  font-weight: bold;
  background-color: #595959;
  border: 1px solid #595959;
  padding: 5px;
`