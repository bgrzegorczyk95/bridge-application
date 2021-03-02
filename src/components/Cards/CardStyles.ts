import styled from 'styled-components';

export const CardWrapper = styled.div<any>`
  width: 100px;
  height: 150px;
  border-radius: 5px;
  position: absolute;
  overflow: hidden;
  top: ${({ position }) => (position === 'TOP' || position === 'RIGHT') && '10px'};
  bottom: ${({ position }) => (position === 'BOTTOM' || position === 'LEFT') && '10px'};
  margin-left: ${({ margin }) => margin};
  ${({ styles }) => styles}

  @media (min-width: 900px) {
    &:hover {
      cursor: pointer;
      margin-bottom: ${({ isVisible }) => isVisible && '10px'};
    }
  }

  @media (max-width: 900px) {
    width: 70px;
    height: 100px;

    top: ${({ position }) => (position === 'TOP' || position === 'RIGHT') && '0'};
    bottom: ${({ position }) => (position === 'BOTTOM' || position === 'LEFT') && '0'};
  }

  @media (max-width: 500px) {
    width: 50px;
    height: 80px;
  }
`;

export const CardsWrapper = styled.div<any>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: ${({ position }) => position === 'TOP' && '0'};
  right: ${({ position }) => position === 'RIGHT' && '20px'};
  bottom: ${({ position }) => position === 'BOTTOM' && '0'};
  left: ${({ position }) => position === 'LEFT' && '20px'};
  transform: ${({ position }) => (position === 'LEFT' || position === 'RIGHT') && 'rotate(90deg)'};
  margin-left: ${({ position, margin }) => (position === 'TOP' || position === 'BOTTOM') && margin};
  margin-top: ${({ position, margin }) => (position === 'LEFT' || position === 'RIGHT') && margin};
  ${({ styles }) => styles}
`;

export const SingleCard = styled.img<any>`
  width: 100%;
  height: 100%;
  cursor: pointer;
  position: relative;

  @media (max-width: 900px) {
    margin-top: ${({ position }) => (position === 'TOP' || position === 'RIGHT') && '-35px'};
    margin-top: ${({ position }) => (position === 'BOTTOM' || position === 'LEFT') && '35px'};

    &:hover {
      margin-top: ${({ position, isVisible }) => (isVisible && (position === 'TOP' || position === 'RIGHT')) && '-25px'};
      margin-top: ${({ position, isVisible }) => (isVisible && (position === 'BOTTOM' || position === 'LEFT')) && '25px'};
    }
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
  color: #595959;
  font-weight: bold;
  white-space: nowrap;
  bottom: ${({ position }) => (position === 'TOP' ||  position === 'RIGHT') && '-190px'};
  top: ${({ position }) => (position === 'BOTTOM' || position === 'LEFT') && '-190px'};
  left: 0;
  transform: ${({ position }) => position === 'RIGHT' && 'rotate(180deg)'};

  @media (max-width: 900px) {
    bottom: ${({ position }) => (position === 'TOP' ||  position === 'RIGHT') && '-95px'};
    top: ${({ position }) => (position === 'BOTTOM' || position === 'LEFT') && '-95px'};
  }

  @media (max-width: 500px) {
    bottom: ${({ position }) => (position === 'TOP' ||  position === 'RIGHT') && '-75px'};
    top: ${({ position }) => (position === 'BOTTOM' || position === 'LEFT') && '-75px'};
  }
`;

export const PlayerNameInitial = styled.div<any>`
  position: absolute;
  top: ${({ position }) => position === 'TOP' && '50px'};
  bottom: ${({ position }) => position === 'BOTTOM' && '50px'};
  color: #ffffff;
  font-weight: bold;
  background-color: #595959;
  border: 1px solid #595959;
  padding: 5px;
`