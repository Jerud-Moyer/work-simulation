import { Badge, Box, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { BadgeAvatar } from '.';
import { setActiveChat } from '../../store/activeConversation';
import { markMessagesAsRead } from '../../store/utils/thunkCreators';
import ChatContent from './ChatContent';

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab",
    },
  },
}));

const Chat = ({ conversation }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [noUnread, setNoUnread] = useState(false);
  const { otherUser, messages } = conversation;
  const unReads = messages.filter(
    message => (!message.isRead && message.senderId === otherUser.id)
  ).length;

  const handleClick = async(conversation) => {
    dispatch(
      setActiveChat(otherUser.username)
    );
    await markMessagesAsRead(
      conversation.id, 
      conversation.otherUser.id
    );
    setNoUnread(true);
  }

  return (
    <Box
      onClick={() => handleClick(conversation)}
      className={classes.root}
    >
      <BadgeAvatar
          photoUrl={otherUser.photoUrl}
          username={otherUser.username}
          online={otherUser.online}
          sidebar={true}
      />
      <ChatContent
        conversation={conversation}
      />
      {!noUnread && unReads > 0 &&

          <Badge 
            badgeContent={unReads} 
            color="primary"
          >
          </Badge>
      }
    </Box>
  );
};

export default Chat;
