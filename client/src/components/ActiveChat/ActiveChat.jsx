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
  const { user, activeConversation, conversations } = props;

  const currentConversation = useMemo(
    () =>
      conversations?.find(
        (conversation) => conversation.otherUser.username === activeConversation
      ),
    [conversations, activeConversation]
  );

  return (
    <Box className={classes.root}>
      {currentConversation?.otherUser && (
        <>
          <Header
            username={currentConversation.otherUser.username}
            online={currentConversation.otherUser.online || false}
          />
          <Box className={classes.chatContainer}>
            <Messages
              messages={currentConversation.messages}
              otherUser={currentConversation.otherUser}
              userId={user.id}
            />
            <Input
              otherUser={currentConversation.otherUser}
              conversationId={currentConversation.id}
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
  conversations: state.conversations,
  activeConversation: state.activeConversation,
});

export default connect(mapStateToProps, null)(ActiveChat);
