import React from 'react';
import styled from 'styled-components';

const MessageWrapper = styled.div<any>`
  display: flex;
  margin: 10px 0;
  justify-content: ${({ received }) => received ? 'flex-end' : 'flex-start'};
  height: 40px;
  width: 100%;
`;

const Text = styled.p<any>`
  display: flex;
  align-items: center;
  position: relative;
  background: ${({ received }) => received ? 'green' : '#cccccc'};
  margin: ${({ received }) => received ? '0 5px 0 0' : '0 0 0 5px'};
  border-radius: 4px;
  padding-left: 5px;
  width: 60%;
  height: 100%;
`;

const Nick = styled.span`
  position: absolute;
  left: 0;
  bottom: -15px;
  font-size: 10px;
  color: #cccccc;
`;

const Time = styled.span`
  position: absolute;
  right: 0;
  bottom: -15px;
  font-size: 10px;
  color: #cccccc;
`;

export const Message = ({ user, nick, message }: any) => {
  const time = new Date();
  const formattedTime = time.toLocaleString("en-US", { hour: "numeric", minute: "numeric" });

  return (
    <MessageWrapper received={user === nick}>
      <Text received={user === nick}>
        {message}
        {user !== nick ? <Nick>{nick}</Nick> : null}
        <Time>{formattedTime}</Time>
      </Text>
    </MessageWrapper>
  )
};
