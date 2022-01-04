import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
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
  previewText: {
    fontSize: 12,
    color: '#9CADC8',
    letterSpacing: -0.17,
  },
  boldPreviewText: {
    fontWeight: 'bold',
    color: 'black',
  },
}));

function ChatContent(props) {
  const classes = useStyles();
  const { latestMessageText, username, hasUnreadMessage } = props;

  const previewTextClasses = clsx(classes.previewText, {
    [classes.boldPreviewText]: hasUnreadMessage,
  });

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>{username}</Typography>
        <Typography className={previewTextClasses}>
          {latestMessageText}
        </Typography>
      </Box>
    </Box>
  );
}

export default ChatContent;
