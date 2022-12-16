import { CaseReducer, createSlice } from "@reduxjs/toolkit";
import { AppState } from ".";
import { Asset } from "../models/asset";

interface AssetsSlice {
  assets: Asset[];
  selectedAsset: Asset | null;
}

type AssetsReducers = {
  setAssets: CaseReducer<AssetsSlice, { payload: Asset[]; type: string }>;
  setSelectedAsset: CaseReducer<AssetsSlice, { payload: Asset; type: string }>;
};

export const assetsSlice = createSlice<AssetsSlice, AssetsReducers>({
  name: "assets",
  initialState: {
    assets: [],
    selectedAsset: null,
  },
  reducers: {
    setAssets: (state, { payload }) => ({ ...state, assets: payload }),
    setSelectedAsset: (state, { payload }) => ({
      ...state,
      selectedAsset: payload,
    }),
  },
});

export const { setAssets, setSelectedAsset } = assetsSlice.actions;

export const selectAssetsSlice = ({ assets }: AppState) => assets;
