import React, { useState } from 'react';
import { auctionOptions } from '../../../../utilities/auctionOptions';
import { InfoWrapper, Img } from './InfoStyles';

interface Props {
  game: any;
}

export const Info = ({ game }: Props) => {
  console.log(game);
  const [contractValue, setContractValue] = useState(parseInt(game.bestBid.value, 10));
  const color = auctionOptions.colors.filter((color: any) => color.name === game.bestBid.colorName);
  const isNS = game.bestBid.place === 'N' || game.bestBid.place === 'S';
  const isEW = game.bestBid.place === 'E' || game.bestBid.place === 'W';

  return (
    <InfoWrapper>
      <div>
        Kontrakt: {game.bestBid.value}
        {color[0].image ? <Img src={color[0].image} alt="atut" /> : 'NT'}
      </div>
      <p>Po partii: {game.gamePoints.afterPart.join(', ')}</p>
      <p>NS: {game.gamePoints.NS.round}{isNS ? `/${contractValue + 6}` : ''}</p>
      <p>EW: {game.gamePoints.EW.round}{isEW ? `/${contractValue + 6}` : ''}</p>
    </InfoWrapper>
  )
}