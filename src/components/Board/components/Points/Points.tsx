import React from 'react';
import { PointsTableStyles } from './PointsStyles';

interface Props {
  points: any;
  isEndGame: boolean;
}

export const Points = ({ points, isEndGame }: Props) => {
  return (
    <PointsTableStyles>
      <caption>Punkty</caption>
      <tr>
        <td>{points?.NS.above || 0}</td>
        <td>{points?.EW.above || 0}</td>
      </tr>
      <tr>
        <th>NS</th>
        <th>EW</th>
      </tr>
      {points?.NS.under?.map((row: any, index: number) => (
        <tr key={index}>
          <td>{row}</td>
          <td>{points.EW.under[index] || 0}</td>
        </tr>
      ))}
      {isEndGame ? (
        <tbody>
          <tr>
            <th>Wynik</th>
            <th>Wynik</th>
          </tr>
          <tr>
            <td>{points?.NS.score || 0}</td>
            <td>{points?.EW.score || 0}</td>
          </tr>
        </tbody>
      ) : null}
    </PointsTableStyles>
  );
};
