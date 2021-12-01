export const crashReporter = (store) => (next) => (action) => {
  try {
    return next(action);
  } catch (e) {
    console.log("error test", e, action);
    // api.send()
  }
};
