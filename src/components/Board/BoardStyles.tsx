import styled from 'styled-components';

interface Props {
  isVisible: boolean;
}

export const BoardWrapper = styled.div`
  display: flex;
`;

export const TablesStyles = styled.div<Props>`
  display: flex;
  flex-direction: column;
  background-color: lightgrey;
  transition: 0.3s linear;
  width: 20%;
  z-index: 5;
  overflow: scroll;
  max-height: calc(100vh - 52px);

  @media (max-width: 1000px) {
    position: absolute;
    height: 100%;
    right: ${({ isVisible }) => (isVisible ? '0' : '-100%')};
    width: ${({ isVisible }) => (isVisible && '50%')};
  }

  @media (max-width: 500px) {
    width: 100%;
  }
`;
