import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { profileReducer } from "./profile";
import thunk from "redux-thunk";
import { conversationReducer } from "./conversations";
import { messagesReducer } from "./messages";
import {
  logger,
  botSendMessage,
  timeScheduler,
  crashReporter,
  // thunk,
} from "./middlewares";

const persistConfig = {
  key: "root",
  storage,
  // blacklist: ["messages", "conversations"],
  whitelist: ["profile"],
};

const rootReducer = combineReducers({
  profile: profileReducer,
  conversations: conversationReducer,
  messages: messagesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  compose(
    applyMiddleware(
      crashReporter,
      timeScheduler,
      botSendMessage,
      logger,
      thunk
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (args) => args
  )
);

export const persistor = persistStore(store);
