import { createSlice } from "@reduxjs/toolkit";

const messages = createSlice({
  name: "messages",
  initialState: [],
  reducers: {
    addMessages: (state, action) => {
      return action.payload;
    },
    clearMessages: (state, action) => {
      state.value = [];
    },
  },
});

export const { addMessages, clearMessages } = messages.actions;
export default messages.reducer;
