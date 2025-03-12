// app/lib/admin/admin-auth.ts (★サーバー専用)

export const verifyAdmin = async (email: string, password: string) => {
  const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@example.com";
  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "password123";

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return { success: true };
  } else {
    return { success: false, error: "管理者ログインに失敗しました。" };
  }
};
