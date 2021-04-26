import styled from 'styled-components';

export const BiddingTableWrapper = styled.div`
`;

export const BiddingTableStyles = styled.table`
  border-collapse: collapse;

  tr {
    background-color: #ffffff;

    :nth-child(even) {
      background-color: rgb(60,59,103);
      color: #ffffff;
    }
  }

  th {
    background-color: #000000;
    color: #ffffff;
  }

  td, th {
    text-align: center;
    padding: 5px 0;
  }

  caption {
    color: #ffffff;
    background: #000000;
    text-transform: uppercase;
    font-weight: bold;
    border-bottom: 1px solid #cccccc;
  }
`;
