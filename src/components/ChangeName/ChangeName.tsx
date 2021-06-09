import { useContext } from 'react';
import { PlayerNameModal } from "../PlayerNameModal/PlayerNameModal";
import { SocketContext } from '../App/App';
import { useHistory } from 'react-router';

export const ChangeName = () => {
  const history = useHistory();
  const { setUserName, userName } = useContext(SocketContext);

  const handleSubmit = (name: string) => {
    setUserName(name);
    localStorage.setItem('userName', name);
    history.push('/');
  };

  return (
    <PlayerNameModal
      userName={userName}
      onSubmit={handleSubmit}
    />
  );
};
