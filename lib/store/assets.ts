import { CaseReducer, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, AppState } from ".";
import { addAsset, getAssets } from "../api/assets";
import { fetchAPI } from "../api/base";
import { Asset, AssetInputs } from "../models/asset";

interface AssetsSlice {
  entities: Asset[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  selectedEntity: Asset | null;
}

type AssetsReducers = {
  setSelectedAsset: CaseReducer<AssetsSlice, { payload: Asset; type: string }>;
};

export const assetsSlice = createSlice<AssetsSlice, AssetsReducers>({
  name: "assets",
  initialState: {
    entities: [],
    status: "idle",
    error: null,
    selectedEntity: null,
  },
  reducers: {
    setSelectedAsset: (state, { payload }) => ({
      ...state,
      selectedAsset: payload,
    }),
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAssets.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAssets.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.entities = action.payload;
      })
      .addCase(fetchAssets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(AddNewAsset.fulfilled, (state, action) => {
        state.entities = [...state.entities, action.payload];
      });
  },
});

export const { setSelectedAsset } = assetsSlice.actions;

export const fetchAssets = createAsyncThunk(
  "assets/fetchAssets",
  async () => await getAssets()
);

export const AddNewAsset = createAsyncThunk(
  "assets/AddNewAsset",
  async (inputs: AssetInputs) => await addAsset(inputs)
);

export const assetsSliceSelector = ({ assets }: AppState) => assets;
