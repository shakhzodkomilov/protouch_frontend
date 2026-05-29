import { createEvent, createStore, sample } from "effector";
import { normalizeError } from "@/shared/lib/error";
import type { Banner } from "./types";
import { getBannersFx } from "./effects";

export const loadBanners = createEvent<{ lang?: string }>();

export const $banners = createStore<Banner[]>([]).on(
  getBannersFx.doneData,
  (_, data) => data.filter((b) => b.isActive !== false),
);

export const $loadingBanners = getBannersFx.pending;

export const $errorBanners = createStore<string | null>(null)
  .on(getBannersFx.failData, (_, e) => normalizeError(e, "Error loading banners"))
  .reset(loadBanners);

sample({ clock: loadBanners, target: getBannersFx });
