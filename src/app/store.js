import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user";
import requestsReducer from "../features/requests";

const store = configureStore({
  reducer: {
    user: userReducer,
    requests: requestsReducer,
  },
});

export default store;
