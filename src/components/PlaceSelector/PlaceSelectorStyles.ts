import styled from 'styled-components';

export const PlaceIcon = styled.img`
  display: none;
  cursor: pointer;

  @media (max-width: 900px) {
    display: inline;
    position: absolute;
    right: 0;
    top: 0;
  }
`;

export const Wrapper = styled.div<any>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  position: absolute;
  right: 10px;
  top: 10px;
  border: 1px solid black;
  border-radius: 5px;
  width: 250px;
  height: 80px;
  z-index: 1;
  background-color: #ffffff;
  transition: 0.2s linear;

  @media (max-width: 900px) {
    transition: 0.2s linear;
    width: ${({ visible }) => visible ? '250px' : '0'};
    height: ${({ visible }) => visible ? '80px' : '0'};
    border: ${({ visible }) => visible ? '1px solid black' : 'none'};
  }
`;

export const Row = styled.div<any>`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  transition-delay: ${({ visible }) => visible ? '0.3s' : '0'};
  transition-duration: ${({ visible }) => visible ? '0.2s' : '0'};

  @media (max-width: 900px) {
    transition-duration: ${({ visible }) => visible ? '0.2s' : '0'};
    visibility: ${({ visible }) => visible ? 'visible' : 'hidden'};
  }
`;

export const Title = styled.p<any>`
  margin: 0;
  font-size: 12px;
  transition-delay: ${({ visible }) => visible ? '0.3s' : '0'};
  transition-duration: ${({ visible }) => visible ? '0.2s' : '0'};

  @media (max-width: 900px) {
    transition-duration: ${({ visible }) => visible ? '0.2s' : '0'};
    visibility: ${({ visible }) => visible ? 'visible' : 'hidden'};
  }
`;

export const Btn = styled.button`
  position: relative;
  width: 45%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 5px 0;
`;

export const CloseIcon = styled.span`
  position: absolute;
  cursor: pointer;
  color:  #404040;
  top: -0.5px;
  right: 2px;
`;