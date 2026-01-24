import { NextResponse } from "next/server";

const MAX_MESSAGE_LENGTH = 1000;

function isValidEmail(email: string) {
  return /.+@.+\..+/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      message?: string;
      company?: string;
    };

    if (body.company) {
      return NextResponse.json({ message: "Request flagged." }, { status: 400 });
    }

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
    }

    if (!isValidEmail(body.email)) {
      return NextResponse.json({ message: "Invalid email address." }, { status: 400 });
    }

    if (body.message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json({ message: "Message too long." }, { status: 400 });
    }

    const payload = {
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      message: body.message.trim()
    };

    console.info("Contact request received", payload);

    return NextResponse.json({ message: "Received" }, { status: 200 });
  } catch (error) {
    console.error("Contact request error", error);
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }
}
