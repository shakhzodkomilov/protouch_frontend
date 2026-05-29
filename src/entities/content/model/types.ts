export type ContentBlock = {
  id: number | string;
  titleUz?: string | null;
  titleRu?: string | null;
  slug?: string | null;
  descriptionUz?: string | null;
  descriptionRu?: string | null;
  bannerUrl?: string | null;
  isActive?: boolean | null;
  createdAt?: string;
  updatedAt?: string;
};

export type Banner = {
  id: number | string;
  title: string;
  slug?: string;
  bannerUrl: string;
  isActive?: boolean;
};

