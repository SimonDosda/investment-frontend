import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { AppState } from ".";
import { addAsset, getAssets } from "../api/assets";
import { Asset, AssetInputs } from "../models/asset";

const assetsAdapter = createEntityAdapter<Asset>();

interface AssetsSlice {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  selectedId: number | null;
}

const initialState = assetsAdapter.getInitialState<AssetsSlice>({
  status: "idle",
  error: null,
  selectedId: null,
});

export const assetsSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {
    setSelectedId: (state, { payload }) => ({
      ...state,
      selectedId: payload,
    }),
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAssets.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAssets.fulfilled, (state, action) => {
        state.status = "succeeded";
        assetsAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchAssets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(AddNewAsset.fulfilled, assetsAdapter.addOne);
  },
});

export const { setSelectedId } = assetsSlice.actions;

export const fetchAssets = createAsyncThunk(
  "assets/fetchAssets",
  async () => await getAssets()
);

export const AddNewAsset = createAsyncThunk(
  "assets/AddNewAsset",
  async (inputs: AssetInputs) => await addAsset(inputs)
);

export const assetsSliceSelector = ({ assets }: AppState) => assets;
export const assetsSelectors =
  assetsAdapter.getSelectors<AppState>(assetsSliceSelector);
