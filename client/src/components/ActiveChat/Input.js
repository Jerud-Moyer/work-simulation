import { FilledInput, FormControl, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postMessage } from '../../store/utils/thunkCreators';

const useStyles = makeStyles((theme) => ({
  root: {
    justifySelf: "flex-end",
    marginTop: theme.spacing(2),
  },
  input: {
    height: theme.spacing(8.75),
    backgroundColor: "#F4F6FA",
    borderRadius: theme.spacing(1),
    marginBottom: theme.spacing(2.5),
  },
}));

const Input = ({ 
  otherUser, 
  conversationId, 
  user 
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc
    const reqBody = {
      text: text,
      recipientId: otherUser.id,
      conversationId: conversationId,
      sender: conversationId 
        ? null
        : user,
      isRead: false,
    };
    if(text)
      dispatch(postMessage(reqBody));
    setText('');
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
        <FormControl fullWidth hiddenLabel>
          <FilledInput
            classes={{ root: classes.input }}
            disableUnderline
            placeholder={'Type something...'}
            value={text}
            name={'text'}
            onChange={handleChange}
          />
        </FormControl>
      </form>
  );
};

export default Input;
