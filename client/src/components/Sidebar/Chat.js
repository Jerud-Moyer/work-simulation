import React, { Component } from "react";
import { Badge, Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { withStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { connect } from "react-redux";
import { markMessagesAsRead } from "../../store/utils/thunkCreators";

const styles = {
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
};

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {noUnRead: false, markedMessages: []}
  };

  handleClick = async (conversation) => {
    await this.props.setActiveChat(conversation.otherUser.username);
    if(!conversation.messages.every(message => message.isRead)) {
    const markedMessages = await markMessagesAsRead(conversation.id, conversation.otherUser.id);
    this.setState({ noUnRead: true, markedMessages });
    }else{
      this.setState({ noUnRead: true })
    }
  };

  render() {
    const { classes } = this.props;
    const otherUser = this.props.conversation.otherUser;
    const unReads = this.props.conversation.messages.filter(
      message => (!message.isRead && message.senderId === otherUser.id)
    ).length;
    const newConvo = {...this.props.conversation, messages: this.state.markedMessages}
    
    return (
      <Box
        onClick={() => this.handleClick(this.props.conversation)}
        className={classes.root}
      >
        <BadgeAvatar
          photoUrl={otherUser.photoUrl}
          username={otherUser.username}
          online={otherUser.online}
          sidebar={true}
        />
        <ChatContent 
          conversation={!this.state.markedMessages
            ? this.props.conversation
            : newConvo} 
        />
        {!this.state.noUnRead && unReads > 0 &&
          <Badge 
            badgeContent={unReads} 
            color="primary"
          >
          </Badge>
        }
      </Box>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
  };
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Chat));
