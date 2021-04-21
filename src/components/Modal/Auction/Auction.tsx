import React from 'react';
import { useAuction } from '../../../hook/useAuction';
import { auctionOptions } from '../../../utilities/auctionOptions';
import { checkIfDoubledAndRedoubled } from '../../../utilities/checkIfDoubledAndRedoubled';
import { AuctionRowStyles, ColorStyles, AuctionColStyles, PassStyles, XStyles, AuctionValue } from './AuctionStyles';

interface Props {
  socket: any;
  gameId: number;
  game: any;
  player: any;
}

export const Auction = ({ game, player, socket, gameId }: Props) => {
  const { setBid, setPass, setDoubled, setRedoubled } = useAuction(game.bestBid, socket, player, gameId, game.turn);
  const { isDoubled, isRedoubled } = checkIfDoubledAndRedoubled(game.bestBid, player);

  const renderCol = (row: number, col: number, value: string, color: { name: string, image: string }) => {
    const disabled = row < game.bestBid?.row || (row === game.bestBid?.row && col <= game.bestBid?.col);

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
        <XStyles onClick={() => isDoubled && setDoubled()} disabled={!isDoubled}>X</XStyles> 
        <XStyles onClick={() => isRedoubled && setRedoubled()} disabled={!isRedoubled}>XX</XStyles> 
      </AuctionRowStyles>
    </>
  )
}