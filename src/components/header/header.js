import { Link } from "react-router-dom";
import styles from "./header.module.css";

export function Header() {
  return (
    <div className={styles.header}>
      <Link to="/">Home</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/chat">Chat</Link>
    </div>
  );
}
