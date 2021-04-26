import React, { useEffect, useState } from 'react';
import { auctionOptions } from '../../../../utilities/auctionOptions';
import { InfoWrapper, Img } from './InfoStyles';

interface Props {
  game: any;
  value?: string;
  place: any;
  player: any;
}

export const Info = ({ game, value, player, place }: Props) => {
  const [contractValue, setContractValue] = useState(parseInt(value, 10) + 6);
  const color = auctionOptions.colors.filter((color: any) => color.name === game.bestBid.colorName);
  const isNS = game.bestBid.place === 'N' || game.bestBid.place === 'S';
  const isEW = game.bestBid.place === 'E' || game.bestBid.place === 'W';

  useEffect(() => setContractValue(parseInt(value, 10) + 6), [value]);

  return (
      <InfoWrapper playerPlace={player.place} bestBidPlace={place}>
        <div>
          Kontrakt: {value}
          {color[0].image ? <Img src={color[0].image} alt="atut" /> : 'NT'}
        </div>
        <p>Po partii: {game.gamePoints.afterPart.join(', ')}</p>
        <p>NS: {game.gamePoints.NS.round}{isNS ? `/${contractValue}` : ''}</p>
        <p>EW: {game.gamePoints.EW.round}{isEW ? `/${contractValue}` : ''}</p>
      </InfoWrapper>
  );
};
