import { useEffect, useState } from 'react';
import { PlayerNameModalStyles, ModalWrapperStyles, Input, Button, ErrorInfo } from './PlayerNameModalStyles';

interface Props {
  onSubmit: (name: string) => void;
  userName: string;
}

export const PlayerNameModal = ({ userName, onSubmit }: Props) => {
  const [name, setName] = useState<string | undefined>(userName);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => setName(userName) ,[userName]);

  const checkValidation = (value: string) => {
    let error = '';

    if (!value) {
      error = 'Pole jest wymagane';
    } else if (value.length < 3) {
      error = 'Minimalna długość wynosi 3';
    } else if (value.length > 20) {
      error = 'Maksymalna długość wynosi 20';
    } else {
      error = '';
    }

    setError(error);

    if (error) {
      setIsValid(false);
    } else {
      setIsValid(true); 
    }

    setName(value);
  }

  const handleChange = (value: string) => {
    checkValidation(value);
  };

  const handleSubmit = (value: string) => {
    checkValidation(value);

    if (isValid) {
      onSubmit(value);
    }
  }

  return (
    <PlayerNameModalStyles>
      <ModalWrapperStyles>
        <label htmlFor="player-name">Wpisz nazwę użytkownika:</label>
        <Input
          type="text"
          autoComplete="off"
          placeholder="wpisz imię"
          value={name}
          onChange={(e) => handleChange(e.target.value)}
        />
        <ErrorInfo>{error}</ErrorInfo>
        <Button type="submit" onClick={() => handleSubmit(name)}>
          Zatwierdź
        </Button>
      </ModalWrapperStyles>
    </PlayerNameModalStyles>
  );
};
