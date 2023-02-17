import { createSlice } from "@reduxjs/toolkit";

type ProductKeys = "id" | "name" | "imageUrl" | "price" | "quantity";
export type StatusState = "idle" | "loading" | "success" | "failed";

export interface Product extends Record<ProductKeys, number | string> {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

export type Categories = { [key: string]: Product[] };

interface CategoriesState {
  categoriesMap: Categories;
  status: StatusState;
  error: null | Error;
}

const initialState: CategoriesState = {
  categoriesMap: {},
  status: "idle",
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    fetchCategoriesLoading: (state) => {
      state.status = "loading";
    },
    fetchCategoriesFulfilled: (state, { payload }) => {
      state.status = "success";
      state.categoriesMap = payload;
    },
    fetchCategoriesRejected: (state, { payload }) => {
      state.status = "failed";
      state.error = payload;
    },
  },
});

export const {
  fetchCategoriesLoading,
  fetchCategoriesFulfilled,
  fetchCategoriesRejected,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
