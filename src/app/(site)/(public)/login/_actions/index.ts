"use server";

import { generateCodeVerifier, generateState } from "arctic";
import { cookies } from "next/headers";
import { verify } from "@node-rs/argon2";

import { google } from "@/lucia/oauth";
import { redirect } from "next/navigation";
import { LoginSchema, loginSchema } from "../_schemas";
import prisma from "@/helpers/db";
import { lucia } from "@/lucia";

export async function loginWithGoogle() {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const url = await google.createAuthorizationURL(state, codeVerifier, {
    scopes: ["profile", "email"],
  });

  cookies().set("google_oauth_state", state, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  cookies().set("google_oauth_code_verifier", codeVerifier, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  redirect(url.href);
}

export async function loginWithEmail(form: LoginSchema) {
  try {
    const validationResult = loginSchema.safeParse(form);
    if (!validationResult.success) {
      return { success: false, error: "Invalid form fields" };
    }

    const { email, password } = validationResult.data;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) {
      return { success: false, error: "Invalid email or password" };
    }

    const isCorrectPassword = await verify(user.password, password);
    if (!isCorrectPassword) {
      return { success: false, error: "Invalid email or password" };
    }
    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return redirect("/");
  } catch (err) {
    console.log(err);
    return { success: false, error: "Internal Server Error" };
  }
}
