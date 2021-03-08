import React from 'react';
import { PlayerNameModalStyles, ModalWrapperStyles, Input, Button } from './PlayerNameModalStyles';

interface Props {
  player: any;
  setUserName: (value: string) => void;
  handleSubmit: (e: React.MouseEventHandler<HTMLButtonElement>) => void;
}

export const PlayerNameModal = ({ player, setUserName, handleSubmit }: Props) => {
  return (
    !player?.name ? (
      <PlayerNameModalStyles>
        <ModalWrapperStyles>
          <label htmlFor="player-name">Wpisz nazwę użytkownika:</label>
          <Input
            type="text"
            id="player-name"
            placeholder="wpisz imię"
            onChange={(e: any) => setUserName(e.target.value)}
          />
          <Button type="submit" onClick={(e: any) => handleSubmit(e)}>
            Zatwierdź
          </Button>
        </ModalWrapperStyles>
      </PlayerNameModalStyles>
    ) : null
  );
};
