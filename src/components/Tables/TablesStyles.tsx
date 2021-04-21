import styled from "styled-components";

export const TablesWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 52px);
  background: #cccccc;

  button {
    width: 200px;
  }
`;

export const TableStyles = styled.table`
  width: 500px;
  text-align: center;

  td {
    border: 1px solid black;
  }
`;