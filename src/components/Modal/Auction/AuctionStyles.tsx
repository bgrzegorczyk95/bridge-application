import styled from "styled-components";

interface Props {
  disabled?: boolean;
}

export const AuctionRowStyles = styled.div`
  width: 100%;
  display: flex;
  font-size: 16px;
`;

export const ColorStyles = styled.img`
  width: 30px;
`;

export const AuctionColStyles = styled.div<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  padding: 5px;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer' };
  border: 1px solid black;
  position: relative;

  > span {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
  }

  > img {
    margin-left: 5px;
  }
`;

export const AuctionValue = styled.span<Props>`
  color: ${({ disabled }) => disabled && '#CCCCCC'};
`;

export const PassStyles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 274px;
  padding: 8px 0;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  background-color: #009914;
  border: 1px solid black;
`;

export const XStyles = styled.div<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  padding: 5px;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer' };
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  background-color: ${({ disabled }) => disabled ? '#CCCCCC' : '#aa052b'};
  border: 1px solid black;
`;