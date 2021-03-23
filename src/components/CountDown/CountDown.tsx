import React, { useEffect, useState } from 'react';

interface Props {
  seconds: number;
  startGame: () => void;
}

export const CountDown = ({ seconds, startGame }: Props) => {
  const [time, setTime] = useState(seconds);

  useEffect(() => {
    const countDown = setInterval(() => {
      setTime(time - 1);
    }, 1000);

    if (time <= 0) {
      startGame();
    }

    return () => clearInterval(countDown);
  }, [time]);

  return (
      <p>Gra rozpocznie się za: {time}</p>
  )
}