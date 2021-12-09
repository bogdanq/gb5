import React, { useCallback, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Input, InputAdornment } from "@mui/material";
import { Send } from "@mui/icons-material";
import { Message } from "./message";
import { useStyles } from "./use-styles";
import { messagesSelector, sendMessageFB } from "../../store/messages";
import {
  conversationsSelector,
  messageValueSelector,
  handleChangeMessageValue,
} from "../../store/conversations";
import { useDispatch, useSelector } from "react-redux";

export const MessageList = ({ session }) => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const styles = useStyles();
  const messages = useSelector(messagesSelector(roomId));
  const conversations = useSelector(conversationsSelector);
  const value = useSelector(messageValueSelector(roomId));

  const dispatch = useDispatch();

  const ref = useRef(null);
  const refWrapper = useRef(null);

  const send = useCallback(() => {
    if (value) {
      dispatch(
        sendMessageFB({ author: session?.email, message: value }, roomId)
      );
    }
  }, [value, roomId, dispatch, session]);

  useEffect(() => {
    if (refWrapper.current) {
      refWrapper.current.scrollTo(0, refWrapper.current.scrollHeight);
    }
  }, [messages]);

  useEffect(() => {
    const isValidRoomId = conversations.find(
      (conversation) => conversation.title === roomId
    );

    if (!isValidRoomId && roomId) {
      navigate("/chat");
    }
  }, [roomId, conversations, navigate]);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const handlePressInput = ({ code }) => {
    if (code === "Enter") {
      send();
    }
  };

  return (
    <>
      <div ref={refWrapper}>
        {messages.map((message, index) => (
          <Message
            message={message}
            key={index}
            dispatch={dispatch}
            roomId={roomId}
          />
        ))}
      </div>

      <Input
        fullWidth
        className={styles.input}
        ref={ref}
        placeholder="enter message..."
        value={value}
        onChange={(e) =>
          dispatch(handleChangeMessageValue(e.target.value, roomId))
        }
        onKeyPress={handlePressInput}
        endAdornment={
          <InputAdornment position="end">
            <Send className={styles.icon} onClick={send} />
          </InputAdornment>
        }
      />
    </>
  );
};

// App.propTypes = {
//   test1: PropTypes.number.isRequired,
//   test2: PropTypes.string.isRequired,
//   test3: PropTypes.func.isRequired,
//   test4: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//   }),
// };
