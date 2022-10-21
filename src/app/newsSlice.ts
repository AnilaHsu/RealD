import { apiKey } from "./../data/api-key";
import { newsArguments, newsState } from "./../type";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchNewsData } from "../data/news";
import { countries } from "../data/country";

const myApiKey = apiKey();
const allCountry = countries()
const userLang = navigator.language;
const countryCode = userLang.split(/-|_/)[1].toLowerCase()
const countryItem = allCountry.find((item) => item.code === countryCode)
const countryName = countryItem ? countryItem.name : ""

const initialState: newsState = {
  category: "",
  countryData: allCountry,
  countryName: countryName,
  countryCode: countryCode,
  newsData: [],
  loading: "idle",
  currentRequestId: undefined,
  error: null,
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    selectCat: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    selectCnt: (state, action: PayloadAction<string>) => {
        state.countryName = action.payload
        const country = state.countryData.find((item) => item.name === action.payload)
        state.countryCode = country ? country.code : ""
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getNewsData.pending, (state, action) => {
        if (state.loading === "idle") {
          state.loading = "pending";
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(getNewsData.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loading === "pending" &&
          state.currentRequestId === requestId
        ) {
          state.loading = "idle";
        //   state.newsData = action.payload;
          state.currentRequestId = undefined;
        }
      })
      .addCase(getNewsData.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loading === "pending" &&
          state.currentRequestId === requestId
        ) {
          state.loading = "idle";
          state.error = action.error.message ?? "";;
          state.currentRequestId = undefined;
        }
      });
  },
});

export const getNewsData = createAsyncThunk(
  "news/Data",
  async ({ category, country }: newsArguments) => {
    const data = await fetchNewsData(category, country, myApiKey);
    return data;
  }
);

export const { selectCat, selectCnt } = newsSlice.actions;
export default newsSlice.reducer;
