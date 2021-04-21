import React from 'react';
import { PointsTableStyles } from './PointsStyles';

interface Props {
  points: any;
}

export const Points = ({ points }: Props) => {
  return (
    <PointsTableStyles>
      <caption>Punkty</caption>
      <tr>
        <td>{points.NS.above}</td>
        <td>{points.EW.above}</td>
      </tr>
      <tr>
        <th>NS</th>
        <th>EW</th>
      </tr>
      {points.NS.under?.map((row: any, index: number) => (
        <tr key={index}>
          <td>{row}</td>
          <td>{points.EW.under[index]}</td>
        </tr>
      ))}
    </PointsTableStyles>
  );
};
