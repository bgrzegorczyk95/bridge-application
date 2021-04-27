import styled from "styled-components";

export const TablesWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 52px);
  padding-top: 20px;
  background: #cccccc;
  box-sizing: border-box;

  button {
    width: 100px;
  }
`;

export const TableStyles = styled.table`
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
    width: 200px;
  }
`;