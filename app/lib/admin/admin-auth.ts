// app/lib/admin/admin-auth.ts
// 🚨 サーバー専用 (クライアントからは直接呼び出せない)

import { cookies } from "next/headers";

/**
 * 管理者ログイン処理 (サーバーサイド)
 */
export const adminLogin = async (username: string, password: string) => {
  if (
    username === process.env.NEXT_PUBLIC_AUTH_USERNAME &&
    password === process.env.NEXT_PUBLIC_AUTH_PASSWORD
  ) {
    (await cookies()).set("admin_auth", "true", {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      path: "/",
    });
    return true;
  }
  return false;
};

/**
 * 管理者ログアウト処理 (サーバーサイド)
 */
export const adminLogout = async () => {
  (await cookies()).delete("admin_auth");
};

/**
 * 認証状態を確認 (サーバーサイド)
 */
export const isAuthenticated = async () => {
  return (await cookies()).get("admin_auth")?.value === "true";
};
