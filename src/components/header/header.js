import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemaContext } from "../../theme-context";
import { firebaseApp } from "../../api/firebase";
import styles from "./header.module.css";

const signOut = () => {
  return firebaseApp.auth().signOut();
};

export function Header({ session }) {
  const {
    theme: { theme, name },
    themeSetter,
  } = useContext(ThemaContext);

  return (
    <div className={styles.header}>
      <Link to="/">Home</Link>
      {!!session && (
        <>
          <Link to="/profile">Profile</Link>
          <Link to="/chat">Chat</Link>
          <Link to="/gists">Gists</Link>
        </>
      )}

      {!!session && <button onClick={signOut}>выход</button>}

      {!session && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/sign-up">Sign-up</Link>
        </>
      )}

      <hr />
      <p style={{ color: theme.color }}>{name}</p>
      <button disabled={name === "dark"} onClick={() => themeSetter("dark")}>
        dark
      </button>
      <button disabled={name === "light"} onClick={() => themeSetter("light")}>
        light
      </button>
    </div>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     profile: state.profile,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     togleVisibleProfileDispatch: () => dispatch(togleVisibleProfile()),
//   };
// };

// export const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderView);
