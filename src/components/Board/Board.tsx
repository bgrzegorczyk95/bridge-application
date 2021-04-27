import React, { useContext, useEffect, useState } from 'react';
import { usePlaces } from '../../hook/usePlaces';
import { Card } from '../Cards/Card';
import { Modal } from '../Modal/Modal';
import { Auction } from '../Modal/Auction/Auction';
import { ThrownCards } from '../ThrownCards/ThrownCards';
import { setPosition } from '../../utilities/positions';
import { TurnArrow } from '../TurnArrow/TurnArrow';
import { Wrapper } from '../App/AppStyles';
import { SocketContext } from '../App/App';
import { BoardWrapper, TablesStyles } from './BoardStyles';
import { BiddingTable } from './components/BiddingTable/BiddingTable';
import { Points } from './components/Points/Points';
import { Info } from './components/Info/Info';
import { EndGame } from './components/EndGame/EndGame';
import { HamburgerButton } from './components/HamburgerButton/HamburgerButton';
import { BiddingCards } from './components/BiddingCards/BiddingCards';
import { Lobby } from '../Lobby/Lobby';

export const Board = ({ socket, gameId }: any) => {
  const [isVisibleTable, setIsVisibleTable] = useState(false);
  const { clientId, player, game, statuses, resetGame } = useContext(SocketContext);
  const { handleClickCard } = usePlaces(socket, game, player, gameId);
  const isStartedAuctionOrGame = game?.statuses.auctionStarted || game?.statuses.gameStarted;

  return (
    game ? (
    <BoardWrapper>
      {console.log(player)}
      <Wrapper>
        <Modal isOpen={statuses?.endGame}><EndGame resetGame={resetGame} game={game} /></Modal>
        {game?.statuses.auctionStarted && <Auction game={game} socket={socket} gameId={gameId} player={player} />}
        {isStartedAuctionOrGame && game?.players?.map((item: any, index: number) => (
          <Card
            key={index}
            place={item.place}
            cards={item.cards}
            user={item?.name}
            cardsAmount={item.cardsAmount}
            position={setPosition(item, clientId, player)}
            isVisible={item.cards.length}
            handleClickCard={(card: any) => handleClickCard(card, item)}
          />
        ))}
        {game?.bestBid.value && (
          <Info
            game={game}
            value={game.bestBid.value}
            player={player}
            place={game.bestBid.place}
          />
        )}
        <ThrownCards
          player={player}
          clientId={clientId}
          isGameStarted={statuses?.gameStarted}
          cards={game?.thrownCards}
          bestBidPlace={game?.bestBid.place}
        />
        {isStartedAuctionOrGame && (
          <TurnArrow
            game={game}
            playerPlace={player?.place}
            position={setPosition(game?.turn, clientId, player)}
          />
        )}
        {game?.statuses?.auctionStarted && (
          <BiddingCards biddingHistory={game?.biddingHistory} place={player?.place} />
        )}
      </Wrapper>
      <HamburgerButton
        isVisible={isVisibleTable}
        handleChange={() => setIsVisibleTable(!isVisibleTable)}
      />
      <TablesStyles isVisible={isVisibleTable}>
        <BiddingTable biddingHistory={game?.biddingHistory} />
        <Points points={game?.gamePoints} isEndGame={game?.statuses.endGame} />
        <Lobby socket={socket} gameId={gameId} />
      </TablesStyles>
    </BoardWrapper>
    ) : null
  );
}
