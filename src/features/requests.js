import { createSlice } from "@reduxjs/toolkit";

const requests = createSlice({
  name: "requests",
  initialState: [],
  reducers: {
    addRequests: (state, action) => {
      return action.payload;
    },
    addRequest: (state, action) => {
      state.push(action.payload);
    },
    removeRequest: (state, action) => {
      return state.filter((req) => req._id != action.payload);
    },
  },
});

export const { addRequests, addRequest, removeRequest } = requests.actions;
export default requests.reducer;
