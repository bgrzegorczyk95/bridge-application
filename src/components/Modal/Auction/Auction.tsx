import React from 'react';
import { useAuction } from '../../../hook/useAuction';
import { auctionOptions } from '../../../utilities/auctionOptions';
import { AuctionRowStyles, ColorStyles, AuctionColStyles, PassStyles, XStyles, AuctionValue } from './AuctionStyles';

interface Props {
  auction: {
    row: number;
    col: number;
    pass?: boolean;
    doubles?: boolean;
    redoubled?: boolean;
  };
  player: any;
  clientId: string;
  socket: any;
  turn: any;
}

export const Auction = ({ auction, socket, player, clientId, turn }: Props) => {
  const {
    setBid, setPass, setDoubled, setRedoubled, isDoubledEnabled, isEnabledRedoubled,
  } = useAuction(auction, socket, player, clientId, turn);

  const renderCol = (row: number, col: number, value: string, color: { name: string, image: string }) => {
    const disabled = row < auction?.row || (row === auction?.row && col <= auction?.col);

    return (
      <AuctionColStyles
        key={`${row}${col}`}
        disabled={disabled}
        onClick={() => !disabled && setBid(row, col, color.name, value)}
      >
        <AuctionValue disabled={disabled}>
          {value} {!color.image && 'NT'}
        </AuctionValue>
        {color.image && <ColorStyles src={disabled ? auctionOptions.disabledColors[col] : color.image} />}
      </AuctionColStyles>
    )
  }

  return (
    <>
      {auctionOptions.values.map((value: string, i: number) => (
        <AuctionRowStyles key={`option${i}`}>
          {auctionOptions.colors.map((color: { name: string, image: string }, j: number) => (
            renderCol(i, j, value, color)
          ))}
        </AuctionRowStyles>
      ))}
      <AuctionRowStyles>
        <PassStyles onClick={setPass}>PASS</PassStyles>
        <XStyles onClick={() => isDoubledEnabled && setDoubled()} disabled={!isDoubledEnabled}>X</XStyles> 
        <XStyles onClick={() => isEnabledRedoubled && setRedoubled()} disabled={!isEnabledRedoubled}>XX</XStyles> 
      </AuctionRowStyles>
    </>
  )
}