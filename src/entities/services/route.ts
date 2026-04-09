/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.json();

    const bodyParams = new URLSearchParams();

    // SKRINSHOTDAGI ANIQ QIYMATLAR
    bodyParams.append("form_id", "1691062");
    bodyParams.append("hash", "17626ac4310a113fb4c54bbac3379070");

    // Maydonlar (Bular o'zgarmaydi)
    bodyParams.append("fields[name_1]", formData.name);
    bodyParams.append("fields[1569717_1]", formData.phone);
    bodyParams.append("fields[1569861_1]", formData.address);

    const amoResponse = await fetch(
      "https://forms.amocrm.ru/forms/atomic/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
        body: bodyParams.toString(),
      },
    );

    const resultText = await amoResponse.text();

    return NextResponse.json({ success: true, debug: resultText });
  } catch (error: any) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
