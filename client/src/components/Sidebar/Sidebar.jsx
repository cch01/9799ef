import React, { useMemo } from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Search, Chat, CurrentUser } from '.';

const useStyles = makeStyles(() => ({
  root: {
    paddingLeft: 21,
    paddingRight: 21,
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    letterSpacing: -0.29,
    fontWeight: 'bold',
    marginTop: 32,
    marginBottom: 15,
  },
}));

function Sidebar(props) {
  const classes = useStyles();
  const { conversations = [] } = props;
  const { handleChange, searchTerm } = props;

  const chats = useMemo(
    () =>
      conversations
        .filter((conversation) =>
          conversation.otherUser.username.includes(searchTerm)
        )
        .map((conversation) => {
          const { latestMessageText, otherUser } = conversation;
          return (
            <Chat
              latestMessageText={latestMessageText}
              otherUser={otherUser}
              key={conversation.otherUser.username}
            />
          );
        }),
    [conversations, searchTerm]
  );

  return (
    <Box className={classes.root}>
      <CurrentUser />
      <Typography className={classes.title}>Chats</Typography>
      <Search handleChange={handleChange} />
      {chats}
    </Box>
  );
}

const mapStateToProps = (state) => ({
  conversations: state.conversations,
});

export default connect(mapStateToProps)(Sidebar);
