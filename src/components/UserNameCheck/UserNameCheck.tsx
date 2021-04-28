import React from 'react';
import { PlayerNameModal } from '../PlayerNameModal/PlayerNameModal';

interface Props {
  children: any;
  user: any;
  setUserName: any;
}

export const UserNameCheck = ({ children, user, setUserName }: Props) => {
  const userName = localStorage.getItem('userName') || user;

  const handleSubmit = (name: string) => {
    setUserName(name);
    localStorage.setItem('userName', name);
  };

  if (userName) {
    console.log(userName);
    setUserName(userName);
    return <>{children}</>;
  }

  return (
    <PlayerNameModal onSubmit={handleSubmit} />
  )
};
