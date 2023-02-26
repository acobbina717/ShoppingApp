export type StatusState = "idle" | "loading" | "success" | "failed";

export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity?: number;
}

export type Categories = { [key: string]: Product[]; title?: any };
