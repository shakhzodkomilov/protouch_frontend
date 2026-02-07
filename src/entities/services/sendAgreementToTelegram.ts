import { BasketState } from "../basket/model/types";
import { formData } from "../types/productService.types";

type SendToTelegramResponse = {
  docx: string;
  pdf: string;
  filesName: string;
};

export const sendToTelegramGroup = async (
  formData: formData,
  basket: BasketState,
) => {
  const api = process.env.NEXT_PUBLIC_LE_AGREEMENT_BOT_SENDER_API_URL;
  try {
    const res = await fetch(`${api}/new_legal_entity`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formData, basket }),
    })
      .then((res) => res.json())
      .then((data) => data);

    return res as SendToTelegramResponse;
  } catch (e) {
    alert("Xatolik");
    console.error(e);
  }
};
