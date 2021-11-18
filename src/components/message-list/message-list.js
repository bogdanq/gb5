import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import debounce from "lodash.debounce";
import { Input, InputAdornment } from "@mui/material";
import { Send } from "@mui/icons-material";
import { Message } from "./message";
import { useStyles } from "./use-styles";

export const MessageList = () => {
  const { roomId } = useParams();
  const styles = useStyles();
  const [messages, setMessages] = useState({});
  const [value, setValue] = useState("");

  const ref = useRef(null);
  const refWrapper = useRef(null);

  const sendMessage = useCallback(
    (author = "User", botMessage) => {
      if (value || botMessage) {
        setMessages({
          ...messages,
          [roomId]: [
            ...(messages[roomId] ?? []),
            { author, message: value || botMessage, date: new Date() },
          ],
        });
        setValue("");
      }
    },
    [messages, value, roomId]
  );

  useEffect(() => {
    if (refWrapper.current) {
      refWrapper.current.scrollTo(0, refWrapper.current.scrollHeight);
    }
  }, [messages]);

  useEffect(() => {
    let block = refWrapper.current;

    const cb = debounce(() => console.log("height", block?.scrollTop), 200);

    if (refWrapper.current) {
      block?.addEventListener("scroll", cb);
    }

    return () => block?.removeEventListener("scroll", cb);
  }, []);

  useEffect(() => {
    const roomMessages = messages[roomId] ?? [];
    const lastMessages = roomMessages[roomMessages.length - 1];
    let timerId = null;

    if (roomMessages.length && lastMessages.author !== "Bot") {
      timerId = setTimeout(() => {
        sendMessage("Bot", "Hello from bot");
      }, 200);
    }

    return () => clearInterval(timerId);
  }, [messages, roomId, sendMessage]);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const handlePressInput = ({ code }) => {
    if (code === "Enter") {
      sendMessage();
    }
  };

  const roomMessages = messages[roomId] ?? [];

  return (
    <>
      <div ref={refWrapper}>
        {roomMessages.map((message, index) => (
          <Message message={message} key={index} />
        ))}
      </div>

      <Input
        fullWidth
        className={styles.input}
        ref={ref}
        placeholder="enter message..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={handlePressInput}
        endAdornment={
          <InputAdornment position="end">
            <Send className={styles.icon} onClick={sendMessage} />
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
