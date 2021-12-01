export const timeScheduler = (store) => (next) => (action) => {
  if (!action.meta || !action.meta.delay) {
    return next(action);
  }

  const timeoutId = setTimeout(() => {
    return next(action);
  }, action.meta.delay);

  return function cancel() {
    clearInterval(timeoutId);
  };
};
