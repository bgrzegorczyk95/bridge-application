import { useEffect, useState } from 'react';
import { Game, Player } from '../../../../@types/types';

import { auctionOptions } from '../../../../utilities/auctionOptions';
import { InfoWrapper, Img } from './InfoStyles';

interface Props {
  game: Game;
  value?: string;
  place: string;
  player: Player;
}

export const Info = ({ game, value, player, place }: Props) => {
  const [contractValue, setContractValue] = useState(parseInt(value, 10) + 6);
  const color = auctionOptions.colors.filter((color) => color.name === game.trump.colorName);
  const isNS = game.trump.place === 'N' || game.trump.place === 'S';
  const isEW = game.trump.place === 'E' || game.trump.place === 'W';

  useEffect(() => setContractValue(parseInt(value, 10) + 6), [value]);

  return (
      <InfoWrapper playerPlace={player.place} trumpPlace={place}>
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
