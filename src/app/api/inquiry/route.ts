import { NextResponse } from "next/server";

type InquiryBody = {
  name?: string;
  email?: string;
  company?: string;
  capacity?: string;
  message?: string;
  website?: string;
};

const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as InquiryBody;

  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  if (!body.name || !body.email || !body.message || !emailReg.test(body.email)) {
    return NextResponse.json({ ok: false, error: "invalid-payload" }, { status: 400 });
  }

  const payload = {
    name: body.name,
    email: body.email,
    company: body.company || "",
    capacity: body.capacity || "",
    message: body.message,
    createdAt: new Date().toISOString(),
  };

  // Replace this with CRM/email integration in production.
  console.info("[inquiry]", JSON.stringify(payload));

  return NextResponse.json({ ok: true });
}
