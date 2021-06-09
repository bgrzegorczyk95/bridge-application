import { useEffect, useState } from 'react';
import styled from 'styled-components';

const colorTypes: { [key: string]: string } = {
  white: '#ffffff',
  black: '#000000',
};

const TextStyles = styled.p<{ color: string }>`
  color: ${({ color }) => colorTypes[color]};
  font-weight: bold;
`;

interface Props {
  seconds: number;
  text: string;
  color: string;
  handleEndTime: () => void;
}

export const CountDown = ({ text, seconds, handleEndTime, color }: Props) => {
  const [time, setTime] = useState(seconds);

  useEffect(() => {
    const countDown = setInterval(() => {
      setTime(time - 1);
    }, 1000);

    if (time <= 0) {
      handleEndTime();
    }

    return () => clearInterval(countDown);
  }, [time]);

  return (
      <TextStyles color={color}>{text}: {time}</TextStyles>
  )
}
