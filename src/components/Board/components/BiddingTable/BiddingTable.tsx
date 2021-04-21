import React from 'react';
import { BiddingTableStyles, BiddingTableWrapper } from './BiddingTableStyles';

interface Props {
  biddingHistory: any;
}

const biddingEmptySlots = {
  E: 1,
  S: 2,
  W: 3,
};

const checkEmptySlots = (biddingHistory) => {
  const rowWithEmptySlots = [];

  if (biddingHistory[0]?.place !== 'N') {
    for (let i = 0; i < biddingEmptySlots[biddingHistory[0]?.place]; i++) {
      rowWithEmptySlots.push({ empty: true });
    }
  }

  return rowWithEmptySlots;
};

const setHistory = (biddingHistory: any) => {
  const history = [];
  let row = checkEmptySlots(biddingHistory);

  biddingHistory.forEach((bid, index: number) => {
    row.push(bid);

    if (bid.place === 'W' || index === (biddingHistory.length - 1)) {
      history.push(row);
      row = [];
    }
  });

  return history;
};

export const BiddingTable = ({ biddingHistory }: Props) => {
  const history = setHistory(biddingHistory);
  console.log('sdf', biddingHistory);
  return (
    <BiddingTableWrapper>
      <BiddingTableStyles>
        <caption>Licytacja</caption>
        <thead>
          <tr>
            <th>N</th>
            <th>E</th>
            <th>S</th>
            <th>W</th>
          </tr>
          </thead>
        <tbody>
            {history?.map((row: any, index: number) => (
              <tr key={index}>
                {row?.map((bid: any, index: number) => {
                  if (bid.empty) return <td>-</td>
                  if (bid.pass) return <td>PASS</td>
                  if (bid.doubled) return <td>X</td>
                  if (bid.redoubled) return <td>XX</td>
                  return <td key={index}>{`${bid.value}${bid.colorName}`}</td>
                })}
              </tr>
            ))}
        </tbody>
      </BiddingTableStyles>
    </BiddingTableWrapper>
  );
};
