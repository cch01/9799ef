import React, { useMemo } from 'react';
import { Box } from '@material-ui/core';
import moment from 'moment';
import { SenderBubble, OtherUserBubble } from '.';

function Messages(props) {
  const { messages, otherUser, userId } = props;
  const latestReadMessageIndex = useMemo(
    () =>
      messages
        .map(
          ({ isReadByRecipient, senderId }) =>
            isReadByRecipient && senderId === userId
        )
        .lastIndexOf(true),
    [messages, userId]
  );

  return (
    <Box>
      {messages.map((message, idx) => {
        const time = moment(message.createdAt).format('h:mm');

        return message.senderId === userId ? (
          <SenderBubble
            key={message.id}
            text={message.text}
            time={time}
            isLatestRead={idx === latestReadMessageIndex}
            otherUser={otherUser}
          />
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
          />
        );
      })}
    </Box>
  );
}

export default Messages;
