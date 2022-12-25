import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { AppState } from ".";
import { getAssets } from "../api/assets";
import { Asset, AssetType } from "../models/asset";

const assetsAdapter = createEntityAdapter<Asset>();

interface AssetsSlice {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  selectedId: number | null;
  filters: {
    type?: AssetType | null;
  };
}

const initialState = assetsAdapter.getInitialState<AssetsSlice>({
  status: "idle",
  error: null,
  selectedId: null,
  filters: {},
});

export const assetsSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {
    setSelectedId: (state, { payload }) => ({
      ...state,
      selectedId: payload,
    }),
    setFilters: (state, { payload }) => ({ ...state, filters: payload }),
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
      });
  },
});

export const { setSelectedId, setFilters } = assetsSlice.actions;

export const fetchAssets = createAsyncThunk(
  "assets/fetchAssets",
  async () => await getAssets()
);

export const assetsSliceSelector = ({ assets }: AppState) => assets;
export const filtersSelectors = ({ assets }: AppState) => assets.filters;
export const assetsSelectors =
  assetsAdapter.getSelectors<AppState>(assetsSliceSelector);

export const filteredAssetsSelector = createSelector(
  assetsSelectors.selectAll,
  filtersSelectors,
  (assets, filters) =>
    assets.filter((asset) => !filters.type || asset.asset_type === filters.type)
);
