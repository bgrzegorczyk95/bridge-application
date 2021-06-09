import { useContext } from 'react';
import { SocketContext } from '../App/App';
import { PlayerNameModal } from '../PlayerNameModal/PlayerNameModal';

interface Props {
  children: React.ReactNode;
}

export const UserNameCheck = ({ children }: Props) => {
  const { setUserName, userName } = useContext(SocketContext);

  const user = localStorage.getItem('userName') || userName;

  const handleSubmit = (name: string) => {
    setUserName(name);
    localStorage.setItem('userName', name);
  };

  if (user) {
    setUserName(user);
    return <>{children}</>;
  }

  return (
    <PlayerNameModal userName={userName} onSubmit={handleSubmit} />
  )
};
