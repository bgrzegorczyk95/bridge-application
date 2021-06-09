import { Bid } from '../../../../@types/types';
import { BiddingTableStyles } from './BiddingTableStyles';

interface Props {
  biddingHistory: Bid[];
}

const biddingEmptySlots: { [key: string]: number } = {
  E: 1,
  S: 2,
  W: 3,
};

const checkEmptySlots = (biddingHistory: Bid[]) => {
  const rowWithEmptySlots = [];

  if (biddingHistory && biddingHistory[0]?.place !== 'N') {
    for (let i = 0; i < biddingEmptySlots[biddingHistory[0]?.place]; i++) {
      rowWithEmptySlots.push({ empty: true });
    }
  }

  return rowWithEmptySlots;
};

const setHistory = (biddingHistory: Bid[]) => {
  const history: any = [];
  let row: any = checkEmptySlots(biddingHistory);

  biddingHistory?.forEach((bid: Bid, index: number) => {
    row.push(bid);

    if (bid.place === 'W' || index === (biddingHistory?.length - 1)) {
      history.push(row);
      row = [];
    }
  });

  return history;
};

export const BiddingTable = ({ biddingHistory }: Props) => {
  const history = setHistory(biddingHistory);

  return (
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
                if (bid.empty) return <td key={index}>-</td>
                if (bid.pass) return <td key={index}>PASS</td>
                if (bid.doubled) return <td key={index}>X</td>
                if (bid.redoubled) return <td key={index}>XX</td>
                return <td key={index}>{`${bid.value}${bid.colorName}`}</td>
              })}
            </tr>
          ))}
      </tbody>
    </BiddingTableStyles>
  );
};
