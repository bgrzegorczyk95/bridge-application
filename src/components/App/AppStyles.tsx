import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  padding: 0;
  width: 80%;
  height: calc(100vh - 52px);
  display: flex;
  justify-content: center;
  background: radial-gradient(green, rgb(40,72,79));  align-items: center;
  overflow: hidden;

  @media (max-width: 1000px) {
    width: 100%;
  }
`;
