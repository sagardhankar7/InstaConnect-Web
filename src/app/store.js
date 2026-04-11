import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user";
import requestsReducer from "../features/requests";
import messagesReducer from "../features/messages";
import roleReducer from "../features/role";

const store = configureStore({
  reducer: {
    user: userReducer,
    requests: requestsReducer,
    messages: messagesReducer,
    role: roleReducer,
  },
});

export default store;
