import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: 'bold',
    letterSpacing: -0.2,
  },
  previewText: ({ hasUnreadMessage }) => ({
    fontSize: 12,
    color: hasUnreadMessage ? 'black' : '#9CADC8',
    letterSpacing: -0.17,
    fontWeight: hasUnreadMessage && 'bold',
  }),
});

function ChatContent(props) {
  const classes = useStyles(props);
  const { latestMessageText, username } = props;

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>{username}</Typography>
        <Typography className={classes.previewText}>
          {latestMessageText}
        </Typography>
      </Box>
    </Box>
  );
}

export default ChatContent;
