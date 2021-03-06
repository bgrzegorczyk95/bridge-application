import { useContext, useState } from 'react';
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
import { Waiting } from './components/Waiting/Waiting';
import { Card as CardTypes, Player } from '../../@types/types';

interface Props {
  socket: WebSocket;
  gameId: number
}

export const Board = ({ socket, gameId }: Props) => {
  const [isVisibleTable, setIsVisibleTable] = useState<boolean>(false);
  const { player, game, statuses, resetGame } = useContext(SocketContext);

  const { handleClickCard } = usePlaces(socket, game, player, gameId);
  const isStartedAuctionOrGame: boolean = game?.statuses.auctionStarted || game?.statuses.gameStarted;

  return (
    game ? (
    <BoardWrapper>
      <Wrapper>
        <Modal isOpen={statuses?.endGame}><EndGame resetGame={resetGame} game={game} /></Modal>
        {game?.statuses.auctionStarted && <Auction game={game} socket={socket} gameId={gameId} player={player} />}
        {game?.statuses.waitingForPlayers && <Waiting resetGame={resetGame}/>}
        {game?.players?.map((item: Player, index: number) => (
          <Card
            key={index}
            place={item.place}
            cards={item.cards}
            user={item?.name}
            cardsAmount={item.cardsAmount}
            position={setPosition(item.place, player)}
            isVisible={item.cards.length}
            handleClickCard={(card: CardTypes) => handleClickCard(card, item)}
          />
        ))}
        {game?.trump?.value && (
          <Info
            game={game}
            value={game.trump.value}
            player={player}
            place={game.trump.place}
          />
        )}
        <ThrownCards
          player={player}
          isGameStarted={statuses?.gameStarted}
          cards={game?.thrownCards}
          trumpPlace={game?.trump.place}
        />
        {isStartedAuctionOrGame && (
          <TurnArrow
            game={game}
            playerPlace={player?.place}
            position={setPosition(game?.turn?.place, player)}
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
