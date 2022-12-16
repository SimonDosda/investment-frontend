import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { assetsSlice } from "./assets";

const makeStore = () =>
  configureStore({
    reducer: {
      assets: assetsSlice.reducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;

export const storeWrapper = createWrapper<AppStore>(makeStore);
