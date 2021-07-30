import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
  unreadPreviewText: {
    color: "black",
    fontWeight: 800
  }
}));

const ChatContent = (props) => {
  const classes = useStyles();
  const { conversation } = props;
  const { latestMessageText, otherUser, messages } = conversation;
  const allRead = messages.filter(
    message => message.senderId === otherUser.id
    ).every(message => message.isRead)
    
  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={allRead 
          ? classes.previewText
          : [classes.previewText, classes.unreadPreviewText]
        }>
          {latestMessageText}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatContent;
