import React, { useEffect, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { connect } from 'react-redux';
import { Input, Header, Messages } from './index';
import { markAsRead } from '../../store/utils/thunkCreators';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexGrow: 8,
    flexDirection: 'column',
  },
  chatContainer: {
    marginLeft: 41,
    marginRight: 41,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
}));

function ActiveChat(props) {
  const classes = useStyles();
  const { user, conversation, markAsRead } = props;
  const unreadMessageIds = useMemo(
    () =>
      conversation?.messages
        ?.filter(
          ({ isReadByRecipient, senderId }) =>
            !isReadByRecipient && senderId !== user.id
        )
        .map(({ id }) => id),
    [conversation]
  );
  useEffect(async () => {
    if (unreadMessageIds?.length) {
      await markAsRead(
        unreadMessageIds,
        conversation.otherUser.id,
        conversation.id
      );
    }
  }, [markAsRead, conversation, unreadMessageIds]);
  return (
    <Box className={classes.root}>
      {conversation?.otherUser && (
        <>
          <Header
            username={conversation.otherUser.username}
            online={conversation.otherUser.online || false}
          />
          <Box className={classes.chatContainer}>
            <Messages
              messages={conversation.messages}
              otherUser={conversation.otherUser}
              userId={user.id}
            />
            <Input
              otherUser={conversation.otherUser}
              conversationId={conversation.id}
              user={user}
            />
          </Box>
        </>
      )}
    </Box>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  conversation:
    state.conversations &&
    state.conversations.find(
      (conversation) =>
        conversation.otherUser.username === state.activeConversation
    ),
});

const mapDispatchToProps = (dispatch) => ({
  markAsRead: (messageIds, messageSenderId, conversationId) => {
    dispatch(markAsRead(messageIds, messageSenderId, conversationId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ActiveChat);
