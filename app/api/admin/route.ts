// app/api/admin/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// 環境変数から管理者の認証情報を取得
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

/**
 * 管理者ログイン処理
 */
export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const response = NextResponse.json({ success: true });
      
      // ✅ クッキーを設定 (Secure, HttpOnly, SameSite)
      response.cookies.set({
        name: "admin_auth",
        value: "true",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // 本番環境ではSecure
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24, // 1日
      });

      return response;
    } else {
      return NextResponse.json({ success: false, error: "認証失敗" }, { status: 401 });
    }
  } catch (error) {
    console.error("エラー:", error);
    return NextResponse.json({ success: false, error: "エラー発生" }, { status: 500 });
  }
}
  

/**
 * 認証チェック
 */
export async function GET() {
  const isAuthenticated = (await cookies()).get("admin_auth")?.value === "true";
  return NextResponse.json({ isAuthenticated });
}

/**
 * ログアウト処理
 */
export async function DELETE() {
  (await cookies()).delete("admin_auth"); // 認証クッキーを削除
  return NextResponse.json({ success: true });
}
