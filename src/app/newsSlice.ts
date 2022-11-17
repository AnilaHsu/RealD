import { apiKey } from "./../data/api-key";
import { newsArguments, newsState } from "./../type";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchNewsData } from "../data/news";
import { countries } from "../data/country";

const allCountry = countries();

const userLang = navigator.language;
const userLangCode = userLang.split(/-|_/)[1].toLowerCase();
const allLangCode = allCountry.map((item) => item.code);
const countryCode = allLangCode.includes(userLangCode) ? userLangCode : "";
const countryItem = allCountry.find((item) => item.code === countryCode);
const countryName = countryItem ? countryItem.name : "";

const initialState: newsState = {
  category: "",
  countryData: allCountry,
  countryName: countryName,
  countryCode: countryCode,
  newsData: [],
  page: 1,
  loadMore: true,
  totalResults: 0,
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
      state.newsData = [];
    },
    selectCnt: (state, action: PayloadAction<string>) => {
      state.countryName = action.payload;
      const country = state.countryData.find(
        (item) => item.name === action.payload
      );
      state.countryCode = country ? country.code : "";
      state.newsData = [];
    },
    IncreasePage: (state) => {
      state.page += 1;
    },
    setLoadMore: (state, action: PayloadAction<boolean>) => {
      state.loadMore = action.payload;
    },
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
          state.newsData.push(...action.payload.articles);
          state.totalResults = action.payload.totalResults;
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
          state.error = action.error.message ?? "";
          state.currentRequestId = undefined;
        }
      });
  },
});

const myApiKey = apiKey();
const pageSize = 20;
export const getNewsData = createAsyncThunk(
  "news/Data",
  async ({ category, country, page }: newsArguments) => {
    const data = await fetchNewsData(
      category,
      country,
      myApiKey,
      pageSize,
      page
    );
    return data;
  }
);

export const { selectCat, selectCnt, IncreasePage, setLoadMore } =
  newsSlice.actions;
export default newsSlice.reducer;
