// import { format } from "date-fns";
import classNames from "classnames";
import { withCounter } from "../../../hocs/with-counter";
import { deleteMessageById } from "../../../store/messages";
import styles from "./message.module.css";

export const Message = withCounter(
  ({ message, increment, decrement, count, dispatch, roomId }) => {
    return (
      <div
        className={classNames(styles.message, {
          [styles.currentMessage]: message.author === "User",
        })}
      >
        <h3>{message.message}</h3>
        <p>{message.author}</p>
        {/* @TODO добавить дату в бд */}
        {/* <p>{format(new Date(message?.date), "yyyy-MM-dd HH:MM:SS")}</p> */}

        <button onClick={() => dispatch(deleteMessageById(message.id, roomId))}>
          X
        </button>
        {/* <hr />
        <span>{count}</span>
        <button onClick={decrement}>decrement</button>
        <button onClick={increment}>increment</button> */}
      </div>
    );
  }
);
