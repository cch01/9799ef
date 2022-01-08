import React, { useCallback, useMemo } from 'react';
import { Badge, Box } from '@material-ui/core';
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
    right: 34,
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
            ({ senderId, isReadByRecipient }) =>
              senderId === otherUserId && !isReadByRecipient
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
      <Badge
        classes={{
          root: classes.badge,
        }}
        badgeContent={unreadMessages.length}
        color="primary"
      />
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
