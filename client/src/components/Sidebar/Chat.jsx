import React, { useCallback, useMemo } from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { BadgeAvatar, ChatContent } from '.';
import { setActiveChat } from '../../store/activeConversation';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: '0 2px 10px 0 rgba(88,133,196,0.05)',
    marginBottom: 10,
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      cursor: 'grab',
    },
  },
  badge: {
    borderRadius: '0.75rem',
    fontFamily: 'Open Sans, sans-serif',
    padding: '3px 8px',
    marginRight: '1rem',
    backgroundColor: '#3F92FF',
    fontSize: '12px',
    color: 'white',
    fontWeight: 'bold',
  },
}));

function Chat(props) {
  const classes = useStyles();
  const { setActiveChat, conversation, activeConversation } = props;
  const { otherUser, messages, latestMessageText } = conversation;
  const { photoUrl, username, online, id: otherUserId } = otherUser;

  const isActiveConversation = activeConversation === username;

  const unreadMessages = useMemo(
    () =>
      isActiveConversation
        ? []
        : messages.filter(
            ({ senderId, recipientReadAt }) =>
              senderId === otherUserId && !recipientReadAt
          ),
    [messages.length, otherUserId, isActiveConversation]
  );

  const handleClick = async (username) => {
    await setActiveChat(username);
  };
  return (
    <Box onClick={() => handleClick(username)} className={classes.root}>
      <BadgeAvatar
        photoUrl={photoUrl}
        username={username}
        online={online}
        sidebar
      />
      <ChatContent
        hasUnreadMessage={!!unreadMessages.length}
        latestMessageText={latestMessageText}
        username={username}
      />
      {!!unreadMessages.length && !isActiveConversation && (
        <div className={classes.badge}>{unreadMessages.length}</div>
      )}
    </Box>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setActiveChat: (id) => {
    dispatch(setActiveChat(id));
  },
});

const mapStateToProps = (state) => ({
  activeConversation: state.activeConversation,
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
