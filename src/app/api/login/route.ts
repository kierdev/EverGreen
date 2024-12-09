import { NextResponse, NextRequest } from "next/server";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../firebase/firebase";
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = body.email;
    const password = body.password;
    console.log(email);
    console.log(password);

    await signInWithEmailAndPassword(auth, email, password);
    return NextResponse.json(
      { message: "Success you are now login!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
