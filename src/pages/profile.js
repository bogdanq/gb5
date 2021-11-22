import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../store/profile";

export const ProfilePage = () => {
  const count = useSelector((state) => state.profile.count);
  // const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>ProfilePage</h1>
      <h1>count: {count}</h1>
      <button onClick={() => dispatch(increment(10))}>increment</button>
      <button onClick={() => dispatch(decrement(5))}>decrement</button>
    </div>
  );
};
