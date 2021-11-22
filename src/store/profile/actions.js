import { INCREMENT, DECREMENT } from "./types";

export const increment = (step) => ({ type: INCREMENT, payload: step });

export const decrement = (step) => ({ type: DECREMENT, payload: step });
