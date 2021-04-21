import React from 'react';
import { TablesWrapper, TableStyles } from './TablesStyles';

interface Props {
  tabs: any;
  handleSelect: (id: number) => void;
}

const countPlayers = (players: any) => players.filter((player: any) => player.takenPlace).length;

export const Tables = ({ tabs, handleSelect }: Props) => {
  console.log(tabs);
  return (
    <TablesWrapper>
      <TableStyles>
        <thead>
          <tr>
            <th>lp.</th>
            <th>ilość graczy</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tabs?.map((tab: any, i: number) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{`${countPlayers(tab.players)}/4`}</td>
              <td><button onClick={() => handleSelect(tab.gameId)}>Wejdź</button></td>
            </tr>
          ))}
        </tbody>
      </TableStyles>
    </TablesWrapper>
  );
};
