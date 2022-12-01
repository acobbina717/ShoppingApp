import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getCategoriesAndDocuments } from "../../../Firebase/firebase.utils";
import { AppDispatch } from "../../app/store";

type ProductKeys = "id" | "name" | "imageUrl" | "price" | "quantity";
type StatusState = "idle" | "loading" | "success" | "failed";

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

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    try {
      return await getCategoriesAndDocuments();
    } catch (error: any) {
      return error;
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.categoriesMap = payload;
      })
      .addCase(
        fetchCategories.rejected,
        (state, { payload }: PayloadAction<any>) => {
          state.status = "failed";
          state.error = payload;
        }
      );
  },
});

// export const {} = categoriesSlice.actions;

export default categoriesSlice.reducer;
