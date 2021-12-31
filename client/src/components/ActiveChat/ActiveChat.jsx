import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { connect } from 'react-redux';
import { Input, Header, Messages } from './index';

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
  const { user, conversation } = props;

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

export default connect(mapStateToProps, null)(ActiveChat);
