import { CaseReducer, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, AppState } from ".";
import { fetchAssets } from "../api/assets";
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

export const loadAssets = () => (dispatch: AppDispatch) => {
  fetchAssets().then((assets) => dispatch(setAssets(assets)));
};

export const assetsSliceSelector = ({ assets }: AppState) => assets;
