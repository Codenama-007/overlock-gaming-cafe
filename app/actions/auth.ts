"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { createSession, deleteSession } from "@/lib/session";

export type LoginState = { message: string } | undefined;

export async function login(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  const expectedEmail = (process.env.ADMIN_EMAIL ?? "").trim().toLowerCase();
  const passwordHash = Buffer.from(
    process.env.ADMIN_PASSWORD_HASH ?? "",
    "base64",
  ).toString("utf8");

  if (!email || !password) {
    return { message: "Invalid credentials." };
  }

  const passwordOk =
    email === expectedEmail &&
    passwordHash !== "" &&
    (await bcrypt.compare(password, passwordHash));

  if (!passwordOk) {
    return { message: "Invalid credentials." };
  }

  await createSession();
  redirect("/admin/dashboard");
}

export async function logout(): Promise<void> {
  await deleteSession();
  redirect("/admin/login");
}