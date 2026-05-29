import { BasketState } from "../basket/model/types";

type formData = Record<string, string>;

type SendToTelegramResponse = {
  docx: string;
  pdf: string;
  filesName: string;
};

export const sendToTelegramGroup = async (
  data: formData,
  basket: BasketState,
): Promise<SendToTelegramResponse | { error: string }> => {
  const api = process.env.NEXT_PUBLIC_LE_AGREEMENT_BOT_SENDER_API_URL;
  if (!api) {
    console.error("[Telegram] NEXT_PUBLIC_LE_AGREEMENT_BOT_SENDER_API_URL is not set");
    return { error: "API URL not configured" };
  }
  try {
    const res = await fetch(`${api}/new_legal_entity`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formData: data, basket }),
    });
    const json = await res.json();
    return json as SendToTelegramResponse;
  } catch (e) {
    console.error("[Telegram] Agreement send failed:", e);
    return { error: "Failed to send agreement" };
  }
};
