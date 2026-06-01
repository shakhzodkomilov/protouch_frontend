/* eslint-disable @typescript-eslint/no-explicit-any */
import { createEffect, createStore, createEvent, combine, sample } from "effector";
import { $api } from "../config/base";
import { loadFavorites } from "../favourite/model/store";
import { loadBasket } from "../basket/model/store";

function getStoredUser(): any | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function persistAuth(accessToken: string, userData: any) {
  localStorage.setItem("accessToken", accessToken);
  if (userData && typeof userData === "object") {
    localStorage.setItem("user", JSON.stringify(userData));
  }
}

export const loginFx = createEffect(async (payload: any) => {
  const response = await $api.post("/api/auth/login", {
    email: payload.email || payload.email_or_phone,
    password: payload.password,
  });
  if (response.data.access_token) {
    persistAuth(response.data.access_token, response.data.admin);
  }
  return response.data;
});

export const clientLoginFx = createEffect(
  async (payload: { login: string; password: string }) => {
    const isEmail = payload.login.includes("@");
    const body: Record<string, string> = {
      password: payload.password,
    };
    if (isEmail) {
      body.email = payload.login;
    } else {
      body.phone = payload.login.replace(/^\+/, "");
    }
    const response = await $api.post("/api/auth/client/login", body);
    if (response.data.access_token) {
      persistAuth(response.data.access_token, response.data.user);
    }
    return response.data;
  },
);

export const partnerLoginFx = createEffect(
  async (payload: { login: string; password: string }) => {
    const isEmail = payload.login.includes("@");
    const body: Record<string, string> = {
      password: payload.password,
    };
    if (isEmail) {
      body.email = payload.login;
    } else {
      body.phone = payload.login.replace(/^\+/, "");
    }
    const response = await $api.post("/api/auth/partner/login", body);
    if (response.data.access_token) {
      persistAuth(response.data.access_token, response.data.user);
    }
    return response.data;
  },
);

export const distributorLoginFx = createEffect(
  async (payload: { login: string; password: string }) => {
    const isEmail = payload.login.includes("@");
    const body: Record<string, string> = {
      password: payload.password,
    };
    if (isEmail) {
      body.email = payload.login;
    } else {
      body.phone = payload.login.replace(/^\+/, "");
    }
    const response = await $api.post("/api/auth/distributor/login", body);
    if (response.data.access_token) {
      persistAuth(response.data.access_token, response.data.user);
    }
    return response.data;
  },
);

export const clientRegisterFx = createEffect(
  async (payload: {
    phone: string;
    firstName: string;
    lastName: string;
    password: string;
  }) => {
    const phoneClean = payload.phone.replace(/^\+/, "");
    const response = await $api.post("/api/auth/client/register", {
      phone: phoneClean,
      firstName: payload.firstName,
      lastName: payload.lastName,
      password: payload.password,
    });
    if (response.data.access_token) {
      persistAuth(response.data.access_token, response.data.user);
      return response.data;
    }

    const loginResponse = await $api.post("/api/auth/client/login", {
      phone: phoneClean,
      password: payload.password,
    });
    if (loginResponse.data.access_token) {
      persistAuth(loginResponse.data.access_token, loginResponse.data.user);
    }
    return loginResponse.data;
  },
);

export const partnerRegisterFx = createEffect(
  async (payload: {
    phone: string;
    firstName: string;
    lastName: string;
    password: string;
    companyName: string;
    inn: string;
    region: string;
  }) => {
    const phoneClean = payload.phone.replace(/^\+/, "");
    const response = await $api.post("/api/auth/partner/register", {
      phone: phoneClean,
      firstName: payload.firstName,
      lastName: payload.lastName,
      password: payload.password,
      companyName: payload.companyName,
      inn: payload.inn,
      region: payload.region,
    });
    if (response.data.access_token) {
      persistAuth(response.data.access_token, response.data.user);
      return response.data;
    }

    const loginResponse = await $api.post("/api/auth/partner/login", {
      phone: phoneClean,
      password: payload.password,
    });
    if (loginResponse.data.access_token) {
      persistAuth(loginResponse.data.access_token, loginResponse.data.user);
    }
    return loginResponse.data;
  },
);

export const distributorRegisterFx = createEffect(
  async (payload: {
    phone: string;
    firstName: string;
    lastName: string;
    password: string;
    companyName: string;
    inn: string;
    region: string;
  }) => {
    const response = await $api.post("/api/auth/distributor/register", {
      phone: payload.phone.replace(/^\+/, ""),
      firstName: payload.firstName,
      lastName: payload.lastName,
      password: payload.password,
      companyName: payload.companyName,
      inn: payload.inn,
      region: payload.region,
    });
    if (response.data.access_token) {
      persistAuth(response.data.access_token, response.data.user);
    }
    return response.data;
  },
);

export const fetchCurrentUserFx = createEffect(async () => {
  const response = await $api.get("/api/auth/me");
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
});

export interface ApplicationItem {
  id: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  type: string;
  firstName: string;
  lastName: string;
  phone: string;
  productIds: number[];
  products: Array<{ id: number; name: string; sku: string }>;
  totalPrice: number;
  companyName?: string;
  inn?: string;
  region?: string;
}

export const fetchApplicationsFx = createEffect(async () => {
  const response = await $api.get("/api/b2b-applications");
  const data = response.data;
  if (Array.isArray(data)) return data as ApplicationItem[];
  if (Array.isArray(data?.results)) return data.results as ApplicationItem[];
  if (Array.isArray(data?.items)) return data.items as ApplicationItem[];
  return [] as ApplicationItem[];
});

export const logout = createEvent();
export const resetAuthStatus = createEvent();
export const loadApplications = createEvent();

export const $applications = createStore<ApplicationItem[]>([])
  .on(fetchApplicationsFx.doneData, (_, data) => data)
  .reset(logout);

export const $applicationsLoading = fetchApplicationsFx.pending;

export const $isAuthPending = combine(
  loginFx.pending,
  clientLoginFx.pending,
  partnerLoginFx.pending,
  distributorLoginFx.pending,
  clientRegisterFx.pending,
  partnerRegisterFx.pending,
  distributorRegisterFx.pending,
  (a, b, c, d, e, f, g) => a || b || c || d || e || f || g,
);



export const $authError = createStore<string | null>(null)
  .on(loginFx.failData, (_, error: any) => {
    return error.response?.data?.detail || "Login yoki parol xato!";
  })
  .on(clientLoginFx.failData, (_, error: any) => {
    return error.response?.data?.detail || "Login yoki parol xato!";
  })
  .on(partnerLoginFx.failData, (_, error: any) => {
    return error.response?.data?.detail || "Login yoki parol xato!";
  })
  .on(distributorLoginFx.failData, (_, error: any) => {
    return error.response?.data?.detail || "Login yoki parol xato!";
  })
  .on(clientRegisterFx.failData, (_, error: any) => {
    return error.response?.data?.detail || "Ro'yxatdan o'tishda xatolik!";
  })
  .on(partnerRegisterFx.failData, (_, error: any) => {
    return error.response?.data?.detail || "Ro'yxatdan o'tishda xatolik!";
  })
  .on(distributorRegisterFx.failData, (_, error: any) => {
    return error.response?.data?.detail || "Ro'yxatdan o'tishda xatolik!";
  })
  .reset(resetAuthStatus);

export const $loginSuccess = createStore(false)
  .on(loginFx.done, () => true)
  .on(clientLoginFx.done, () => true)
  .on(partnerLoginFx.done, () => true)
  .on(distributorLoginFx.done, () => true)
  .on(clientRegisterFx.done, () => true)
  .on(partnerRegisterFx.done, () => true)
  .reset(resetAuthStatus);

export const $user = createStore<any | null>(getStoredUser())
  .on(clientLoginFx.doneData, (_, res) => res.user || res)
  .on(partnerLoginFx.doneData, (_, res) => res.user || res)
  .on(distributorLoginFx.doneData, (_, res) => res.user || res)
  .on(loginFx.doneData, (_, res) => res.admin || res)
  .on(clientRegisterFx.doneData, (_, res) => res.user || res)
  .on(partnerRegisterFx.doneData, (_, res) => res.user || res)
  .on(fetchCurrentUserFx.doneData, (_, res) => res)
  .reset(logout);

export const $isAuth = createStore<boolean>(
  typeof window !== "undefined" && !!localStorage.getItem("accessToken"),
)
  .on(loginFx.doneData, () => true)
  .on(clientLoginFx.doneData, () => true)
  .on(partnerLoginFx.doneData, () => true)
  .on(distributorLoginFx.doneData, () => true)
  .on(clientRegisterFx.doneData, () => true)
  .on(partnerRegisterFx.doneData, () => true)
  .on(logout, () => false);

export const $isDistributor = $user.map(
  (u) => u?.role === "DISTRIBUTOR",
);

logout.watch(() => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  }
});

$loginSuccess.reset(logout);
$loginSuccess.reset(resetAuthStatus);

sample({
  clock: [
    clientLoginFx.done,
    partnerLoginFx.done,
    distributorLoginFx.done,
    clientRegisterFx.done,
    partnerRegisterFx.done,
  ],
  target: [loadFavorites, loadBasket, loadApplications],
});

sample({
  clock: loadApplications,
  target: fetchApplicationsFx,
});
