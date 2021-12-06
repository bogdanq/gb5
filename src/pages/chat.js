import { useEffect, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Layout, ChatList, MessageList } from "../components";
import { ThemaContext } from "../theme-context";
import { getConversationsFB } from "../store/conversations";
import { getMessagesFB } from "../store/messages";

export const ChatPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    theme: { theme },
  } = useContext(ThemaContext);

  useEffect(() => {
    const listener = ({ code }) => {
      if (code === "Escape") {
        navigate("/chat");
      }
    };

    document.addEventListener("keydown", listener);

    return () => document.removeEventListener("keydown", listener);
  }, [navigate]);

  useEffect(() => {
    dispatch(getConversationsFB());
    dispatch(getMessagesFB());
  }, [dispatch]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout
            chats={<ChatList />}
            messages={<h1 style={{ color: theme.color }}>выберите чат ...</h1>}
          />
        }
      />
      <Route
        path="/:roomId"
        element={<Layout chats={<ChatList />} messages={<MessageList />} />}
      />
    </Routes>
  );
};
