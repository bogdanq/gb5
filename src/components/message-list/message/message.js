import classNames from "classnames";
import { withCounter } from "../../../hocs/with-counter";
import styles from "./message.module.css";

export const Message = withCounter(
  ({ message, increment, decrement, count }) => {
    return (
      <div
        className={classNames(styles.message, {
          [styles.currentMessage]: message.author === "User",
        })}
      >
        <h3>{message.message}</h3>
        <p>{message.author}</p>
        <p>12.03</p>
        {/* <hr />
        <span>{count}</span>
        <button onClick={decrement}>decrement</button>
        <button onClick={increment}>increment</button> */}
      </div>
    );
  }
);
