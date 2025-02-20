import { configureStore } from "@reduxjs/toolkit"; // Correct spelling
import authSlice from './reducers/auth'

const store = configureStore({
  reducer: {
    [authSlice.name] : authSlice.reducer,
  },
});

export default store;