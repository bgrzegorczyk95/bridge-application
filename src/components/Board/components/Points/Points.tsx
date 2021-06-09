import { GamePoints } from '../../../../@types/types';
import { PointsTableStyles } from './PointsStyles';

interface Props {
  points: GamePoints;
  isEndGame: boolean;
}

export const Points = ({ points, isEndGame }: Props) => {
  return (
    <PointsTableStyles>
      <caption>Punkty</caption>
      <tbody>
      <tr>
        <td>{points?.NS.above || 0}</td>
        <td>{points?.EW.above || 0}</td>
      </tr>
      <tr>
        <th>NS</th>
        <th>EW</th>
      </tr>
      {points?.NS.under?.map((row: number, index: number) => (
        <tr key={index}>
          <td>{row}</td>
          <td>{points.EW.under[index] || 0}</td>
        </tr>
      ))}
      {isEndGame ? (
        <>
          <tr>
            <th>Wynik</th>
            <th>Wynik</th>
          </tr>
          <tr>
            <td>{points?.NS.score || 0}</td>
            <td>{points?.EW.score || 0}</td>
          </tr>
        </>
      ) : null}
      </tbody>
    </PointsTableStyles>
  );
};
