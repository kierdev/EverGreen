import { NextResponse, NextRequest } from "next/server";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = body.email;
    const password = body.password;

    await createUserWithEmailAndPassword(auth, email, password);
    return NextResponse.json({ message: "Success!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
