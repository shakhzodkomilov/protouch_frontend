import { NextResponse } from "next/server";

const AMOCRM_FORM_ID = process.env.AMOCRM_FORM_ID ?? "1691062";
const AMOCRM_FORM_HASH = process.env.AMOCRM_FORM_HASH ?? "17626ac4310a113fb4c54bbac3379070";
const AMOCRM_FORM_URL =
  process.env.AMOCRM_FORM_URL ?? "https://forms.amocrm.ru/forms/atomic/send";

export async function POST(request: Request) {
  try {
    const formData = await request.json();

    const bodyParams = new URLSearchParams();
    bodyParams.append("form_id", AMOCRM_FORM_ID);
    bodyParams.append("hash", AMOCRM_FORM_HASH);
    bodyParams.append("fields[name_1]", formData.name);
    bodyParams.append("fields[1569717_1]", formData.phone);
    bodyParams.append("fields[1569861_1]", formData.address);

    const amoResponse = await fetch(AMOCRM_FORM_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      body: bodyParams.toString(),
    });

    const resultText = await amoResponse.text();

    return NextResponse.json({ success: true, debug: resultText });
  } catch (error) {
    console.error("[amoCRM] Failed to submit form:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
