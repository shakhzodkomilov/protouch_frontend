/* eslint-disable @typescript-eslint/no-explicit-any */
import { createEffect, createStore, createEvent, combine } from "effector";
import { $api } from "../config/base";

const LOGIN_URL = "https://api.protouch.uz/api/v1/auth/login/";
const REGISTER_URL = "https://api.protouch.uz/api/v1/auth/register/";

export const loginFx = createEffect(async (payload: any) => {
  const response = await $api.post("/api/v1/auth/login/", payload);
  if (response.data.access) {
    localStorage.setItem("accessToken", response.data.access);
    localStorage.setItem("refreshToken", response.data.refresh || "");
  }
  return response.data;
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const registerFx = createEffect(async (payload: any) => {
  const response = await $api.post("/api/v1/auth/register/", payload);
  return response.data;
});
export const authGoogleFx = createEffect(async (googleToken: string) => {
  const response = await $api.post("/api/v1/auth/google/", {
    token: googleToken,
  });
  if (response.data.access) {
    localStorage.setItem("accessToken", response.data.access);
  }
  return response.data;
});
export const resetAuthStatus = createEvent();

export const $isAuthPending = combine(
  loginFx.pending,
  registerFx.pending,
  (l, r) => l || r,
);

export const $authError = createStore<string | null>(null)
  .on(loginFx.failData, (_, error: any) => {
    return error.response?.data?.detail || "Login yoki parol xato!";
  })
  .on(registerFx.failData, (_, error: any) => {
    const data = error.response?.data;
    if (data && typeof data === "object") {
      return Object.entries(data)
        .map(
          ([key, val]) =>
            `${key}: ${Array.isArray(val) ? val.join(", ") : val}`,
        )
        .join(" | ");
    }
    return "Ro'yxatdan o'tishda xatolik yuz berdi";
  })
  .reset(resetAuthStatus);

export const $loginSuccess = createStore(false)
  .on(loginFx.done, () => true)
  .reset(resetAuthStatus);

export const $registerSuccess = createStore(false)
  .on(registerFx.done, () => true)
  .reset(resetAuthStatus);

export const $user = createStore<any | null>(null)
  .on(loginFx.doneData, (_, res) => res.user || res)
  .reset(resetAuthStatus);

export const $isAuth = createStore<boolean>(false)
  .on(loginFx.doneData, () => true)
  .on(loginFx.failData, () => false);
