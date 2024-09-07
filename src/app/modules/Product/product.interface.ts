export type TProducts = {
  name: string;
  brandName: string;
  category: string;
  price: number;
  quantity: number;
  description: string;
  sellsCount?: number;
  isStock: boolean;
  isTopProduct: boolean;
  isTrendingProduct: boolean;
  img: string;
  imgLists?: string[];
  isAvailable?: boolean;
  isDeleted?: boolean;
};
