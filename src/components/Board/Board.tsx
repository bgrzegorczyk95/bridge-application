import React, { useContext, useEffect, useState } from 'react';
import { usePlaces } from '../../hook/usePlaces';
import { Card } from '../Cards/Card';
import { Modal } from '../Modal/Modal';
import { PlaceSelector } from '../PlaceSelector/PlaceSelector';
import { PlayerNameModal } from '../PlayerNameModal/PlayerNameModal';
import { ReadyStatus } from '../Modal/components/ReadyStatus';
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

export const Board = ({ socket, gameId }: any) => {
  const { clientId, userName, player, game, statuses, setPlayer } = useContext(SocketContext);
  const {
    // turn,
    // trump,
    // player,
    // places,
    // auction,
    // clientId,
    // showReadyModal,
    // auctionStarted,
    // gameStarted,
    // thrownCards,
    // showCountDown,
    // auctionHistory,
    // setPlace,
    // setPlayer,
    // cleanPlace,
    // setIsReady,
    // setUserName,
    // handleSubmit,
    // handleStartGame,
    handleClickCard,
} = usePlaces(socket, game, player, gameId);
  console.log('CC', player);
  useEffect(() => {
    socket.send(JSON.stringify({ method: 'startBidding', gameId }));
  }, []);

  // socket.onopen = (() => {
  //   const clientId = localStorage.getItem('clientId');
  //   const player = JSON.parse(localStorage.getItem('player'));

  //   if (player) {
  //     setPlayer(player);
  //   }

  //   const payload = {
  //     method: 'connect',
  //     clientId,
  //   };

  //   socket.send(JSON.stringify(payload));
  // });

  return (
    <BoardWrapper>
      <Wrapper>
        <Modal isOpen={(statuses.auctionStarted && game?.turn.place === player?.place) && !statuses.gameStarted}>
            <Auction game={game} socket={socket} gameId={gameId} player={player} />
        </Modal>
        {game.players?.map((item: any, index: number) => (
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
        {console.log(game, 'asd')}
        {game.statuses.gameStarted && <Info game={game} />}
        <ThrownCards clientId={clientId} player={player} cards={game.thrownCards} />
        {(statuses.auctionStarted || game.statuses.gameStarted) && <TurnArrow position={setPosition(game.turn, clientId, player)} />}
      </Wrapper>
      <TablesStyles>
        <BiddingTable biddingHistory={game.biddingHistory} />
        <Points points={game.gamePoints} />
      </TablesStyles>
    </BoardWrapper>
  );
}
