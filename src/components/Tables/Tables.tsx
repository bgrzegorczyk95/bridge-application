import { Game, Player } from '../../@types/types';
import { TablesWrapper, TableStyles } from './TablesStyles';

interface Props {
  games: Game[];
  handleSelect: (id: number) => void;
}

const countPlayers = (players: Player[]) => players.filter((player) => player.takenPlace).length;

export const Tables = ({ games, handleSelect }: Props) => {
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
          {games?.map((game: Game, i: number) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{`${countPlayers(game.players)}/4`}</td>
              <td><button onClick={() => handleSelect(game.gameId)}>Wejdź</button></td>
            </tr>
          ))}
        </tbody>
      </TableStyles>
    </TablesWrapper>
  );
};
