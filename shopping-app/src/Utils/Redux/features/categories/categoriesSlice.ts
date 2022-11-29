import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type ProductKeys = "id" | "name" | "imageUrl" | "price" | "quantity";

export interface Product extends Record<ProductKeys, number | string> {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

export type Categories = { [key: string]: Product[] };

interface CategoriesState {
  categoriesMap: Categories;
}

const initialState: CategoriesState = {
  categoriesMap: {},
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategoriesMap: (state, { payload }: PayloadAction<Categories>) => {
      state.categoriesMap = payload;
    },
  },
});

export const { setCategoriesMap } = categoriesSlice.actions;

export default categoriesSlice.reducer;
