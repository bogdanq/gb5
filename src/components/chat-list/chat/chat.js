import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";
import { deleteConversation } from "../../../store/conversations";
import { lastMessageSelector } from "../../../store/messages";
import styles from "./chat.module.css";
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => {
  return {
    item: {
      "&.Mui-selected": {
        backgroundColor: "#2b5278",
      },
      "&.Mui-selected:hover": {
        backgroundColor: "#2b5278",
      },
    },
  };
});

export function Chat({ title, selected, handleListItemClick, dispatch }) {
  const s = useStyles();
  const navigate = useNavigate();
  const message = useSelector(lastMessageSelector(title));

  const deleteRoom = (e) => {
    dispatch(deleteConversation(title));
    setTimeout(() => navigate("/chat"), 100);
  };

  return (
    <ListItem
      className={s.item}
      button={true}
      selected={selected}
      onClick={handleListItemClick}
      data-testid="wrapper"
    >
      <ListItemIcon>
        <button onClick={deleteRoom}>X</button>
        <AccountCircle fontSize="large" className={styles.icon} />
      </ListItemIcon>
      <div className={styles.description}>
        <ListItemText className={styles.text} primary={title} />
        <ListItemText className={styles.text} primary={message?.message} />
        <ListItemText className={styles.text} primary="12.30" />
      </div>
    </ListItem>
  );
}
