export type CategoryChildrenBrandType = {
  id: string;
  title: string;
};

export type CategoryChildrenType = {
  id: string;
  title: string;
  slug: string;
  brands?: Array<CategoryChildrenBrandType>;
};

export type CategoryImageType = {
  id: string;
  url: string;
};

export type CategoryType = {
  id: string;
  title: string;
  slug: string;
  is_carousel: boolean;
  image: CategoryImageType;
  children: Array<CategoryChildrenType>;
};

type DiscountType = {
  id: string;
  percent: number;
  discounted_price: number;
  start_date: string;
  end_date: string;
  is_active: boolean;
};

export type ProductType = {
  id: string;
  title: string;
  short_description: string;
  slug: string;
  price: number; // ✅ CHANGED: string → number
  is_in_stock: boolean;
  is_pre_order: boolean;
  image: string;
  discount: DiscountType | null; // ✅ Make optional
};
export type PaginationType = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<ProductType>;
};

type ImageType = {
  id: string;
  url: string;
};

type Detail = {
  key: string;
  value: string;
};

export type ProductDetailType = {
  id: string;
  title: string;
  slug: string;
  price: number; // ✅ CHANGED: string → number
  short_description: string;
  description: string;
  is_in_stock: boolean;
  is_pre_order: boolean;
  discount: DiscountType | null; // ✅ Make optional
  images: Array<ImageType>;
  details: Array<Detail>;
};
export type ProductsResponse = {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: string;
  discount: number;
  discounted_price: number;
  is_available?: boolean;
  is_pre_order?: boolean;
  photo_url: string;
};

export type ProductSpecification = {
  width: string;
  depth: string;
  height: string;
};

export type ProductGallery = {
  id: string;
  photo_url: string;
};

export type ProductsDetailResponse = {
  id: string;
  title: string;
  slug: string;
  price: string;
  discount: number;
  discounted_price: number;
  description: string;
  product_specification: ProductSpecification;
  gallery: Array<ProductGallery>;
};

export type formData = {
  companyName: string;
  phone: string;
  inn: string;
  telegramUser: string;
};
