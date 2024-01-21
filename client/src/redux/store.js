import { configureStore } from "@reduxjs/toolkit";
import emailReducer from "./getEmailSlice";
export const store = configureStore({
  reducer: { email: emailReducer },
});
