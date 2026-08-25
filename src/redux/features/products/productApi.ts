"use client";

import { baseApi } from "@/redux/api/baseApi";

export type ProductCategory = {
  id: string;
  name: string;
};

export type ProductBrand = {
  id: string;
  title: string;
};

export type Product = {
  id: string;
  name: string;
  sku: string;
  price: number;
  stockQty: number;
  description: string;
  image: string;
  attributes: Record<string, string>;
  subtitle?: string;
  packSize?: string;
  isActive: boolean;
  isFeatured?: boolean;
  category: ProductCategory;
  brand: ProductBrand;
  createdAt?: string;
  updatedAt?: string;
};

export type ProductPayload = {
  name: string;
  sku: string;
  category: string;
  brand: string;
  price: number;
  stockQty: number;
  description?: string;
  image?: string;
  isActive?: boolean;
  isFeatured?: boolean;
  attributes: Record<string, string>;
};

export type ProductFacetItem = {
  label: string;
  count: number;
};

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalInCategory?: number;
  facets?: Record<string, ProductFacetItem[]>;
};

export type ProductListParams = {
  category?: string;
  brand?: string[];
  minPrice?: string;
  maxPrice?: string;
  sort?: "newest" | "priceAsc" | "priceDesc" | "bestSelling";
  page?: number;
  limit?: number;
  featured?: boolean;
  active?: boolean;
  search?: string;
  attributes?: Record<string, string[]>;
};

type ProductListResponse = {
  success: boolean;
  message?: string;
  data: Product[];
  meta?: PaginationMeta;
};

type ProductResponse = {
  success: boolean;
  message?: string;
  data: Product | null;
};

type UploadResponse = {
  success: boolean;
  data?: { url?: string };
};

const toParams = (arg?: ProductListParams | void) => {
  const params: Record<string, string | number> = {
    page: arg?.page ?? 1,
    limit: arg?.limit ?? 8,
  };
  if (arg?.category) params.category = arg.category;
  if (arg?.brand?.length) params.brand = arg.brand.join(",");
  if (arg?.minPrice) params.minPrice = arg.minPrice;
  if (arg?.maxPrice) params.maxPrice = arg.maxPrice;
  if (arg?.sort) params.sort = arg.sort;
  if (arg?.featured === true) params.featured = "true";
  if (arg?.featured === false) params.featured = "false";
  if (arg?.active === true) params.active = "true";
  if (arg?.active === false) params.active = "false";
  if (arg?.search) params.search = arg.search;
  if (arg?.attributes) {
    Object.entries(arg.attributes).forEach(([key, values]) => {
      if (values.length) params[key] = values.join(",");
    });
  }
  return params;
};

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductListResponse, ProductListParams | void>({
      query: (arg) => ({
        url: "/products",
        params: toParams(arg),
      }),
      providesTags: ["product"],
    }),
    getAdminProducts: builder.query<ProductListResponse, ProductListParams | void>({
      query: (arg) => ({
        url: "/admin/products",
        params: toParams({ ...arg, limit: arg?.limit ?? 10 }),
      }),
      providesTags: ["product"],
    }),
    createProduct: builder.mutation<ProductResponse, ProductPayload>({
      query: (body) => ({
        url: "/admin/products",
        method: "POST",
        body,
      }),
      invalidatesTags: ["product", "brand"],
    }),
    updateProduct: builder.mutation<ProductResponse, ProductPayload & { id: string }>({
      query: ({ id, ...body }) => ({
        url: `/admin/products/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["product", "brand"],
    }),
    deleteProduct: builder.mutation<ProductResponse, string>({
      query: (id) => ({
        url: `/admin/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product", "brand"],
    }),
    uploadProductImage: builder.mutation<UploadResponse, File>({
      query: (file) => {
        const body = new FormData();
        body.append("file", file);
        return {
          url: "/upload",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetAdminProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useUploadProductImageMutation,
} = productApi;
