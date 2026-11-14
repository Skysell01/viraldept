import { NextResponse } from "next/server";

const GOOGLE_SCRIPT_WEBHOOK_URL =
  process.env.NEXT_PUBLIC_GOOGLE_SHEET_WEBHOOK ||
  "https://script.google.com/macros/s/AKfycbyJAH-XedJTAwe8SKQWZ-RI_xh-NzUHf-Q9koKawNgnlmLUCF0Z0lmjC7ufFWPRfSry/exec";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const payload = {
      type: body.type || "brand",
      name: body.name || "",
      email: body.email || "",
      handleOrWebsite: body.handleOrWebsite || "",
      budget: body.budget || "",
      message: body.message || "",
      submittedAt: body.submittedAt || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    };

    // Forward server-to-server to Google Apps Script (bypassing any browser CORS or redirect issues)
    const response = await fetch(GOOGLE_SCRIPT_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      redirect: "follow",
    });

    const resultText = await response.text();

    try {
      const jsonResult = JSON.parse(resultText);
      return NextResponse.json({ success: true, ...jsonResult });
    } catch {
      return NextResponse.json({ success: true, raw: resultText });
    }
  } catch (error: unknown) {
    console.error("API Leads proxy error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to submit lead";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
