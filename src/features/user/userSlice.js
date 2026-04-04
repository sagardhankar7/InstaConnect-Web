import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null, //initially user null
  reducers: {
    addUser: (state, action) => {
      return action.payload; // update state
    },
    removeUser: (state, action) => {
      return null; // update state
    },
  },
});

export default userSlice.reducer;
export const { addUser, removeUser } = userSlice.actions;
