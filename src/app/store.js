import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user";
import requestsReducer from "../features/requests";
import messagesReducer from "../features/messages";

const store = configureStore({
  reducer: {
    user: userReducer,
    requests: requestsReducer,
    messages: messagesReducer,
  },
});

export default store;
