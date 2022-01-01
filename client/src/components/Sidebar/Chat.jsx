import React, { useCallback } from 'react';
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
}));

function Chat(props) {
  const classes = useStyles();
  const { latestMessageText, otherUser, setActiveChat } = props;
  const { photoUrl, username, online } = otherUser;

  const handleClick = async (username) => {
    await props.setActiveChat(username);
  };
  return (
    <Box onClick={() => handleClick(username)} className={classes.root}>
      <BadgeAvatar
        photoUrl={photoUrl}
        username={username}
        online={online}
        sidebar
      />
      <ChatContent latestMessageText={latestMessageText} username={username} />
    </Box>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setActiveChat: (id) => {
    dispatch(setActiveChat(id));
  },
});

export default connect(null, mapDispatchToProps)(Chat);
