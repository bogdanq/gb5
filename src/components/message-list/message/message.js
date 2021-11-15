import { memo } from "react";
// import classnames from "classnames";

export const Message = memo(({ message }) => {
  // const className = classnames("class1", "class2", {
  //   botMessage: message.author === "Bot"
  // });

  return (
    <div>
      <div>{message.author}</div>
      <div>{message.message}</div>
      <div>12:03</div>
      <hr />
    </div>
  );
});
