// app/lib/admin/admin-auth-client.ts
// 🚨 クライアント用 (API をフェッチする)

/**
 * クライアント側のログイン処理
 */
export const loginClient = async (username: string, password: string) => {
    const res = await fetch("/api/admin", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include", // ✅ クッキーを含める
    });
  
    if (res.ok) {
      localStorage.setItem("isAuthenticated", "true");
      // ✅ 確認のために再度 /api/admin にアクセス
      const checkRes = await fetch("/api/admin", { credentials: "include" });
      const checkData = await checkRes.json();
      return checkData.isAuthenticated;
    } else {
      return false;
    }
  };
  
  /**
   * 認証状態の確認
   */
  export const isAuthenticatedClient = async () => {
    const res = await fetch("/api/admin", { credentials: "include" });
    if (!res.ok) return false;
  
    const data = await res.json();
    return data.isAuthenticated;
  };
  
  /**
   * ログアウト処理
   */
  export const logoutClient = async () => {
    await fetch("/api/admin", { method: "DELETE" });
    localStorage.removeItem("isAuthenticated");
  };
  