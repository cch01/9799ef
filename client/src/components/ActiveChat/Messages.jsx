import React from 'react';
import { Box } from '@material-ui/core';
import moment from 'moment';
import { SenderBubble, OtherUserBubble } from '.';

function Messages(props) {
  const { messages, otherUser, userId } = props;

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format('h:mm');

        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} />
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
