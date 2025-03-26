// app/components/admin/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // 追加
import { loginClient, isAuthenticatedClient, logoutClient } from "../../lib/admin/admin-auth-client";

export default function AdminLoginApp() {
  const router = useRouter(); // 追加
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const success = await loginClient(username, password);
    if (success) {
      alert("ログイン成功");
      router.push("/firebase"); // ✅ ここでページ遷移
    } else {
      alert("ログイン失敗");
    }
  };

  const checkAuth = async () => {
    const isAuthenticated = await isAuthenticatedClient();
    alert(isAuthenticated ? "認証済み" : "未認証");
  };

  const handleLogout = async () => {
    await logoutClient();
    alert("ログアウトしました");
    // router.refresh(); // ページを再読み込み
    window.location.reload();
  };

  return (
    <div className="p-20 bg-stone-200 min-h-screen font-cinecaption">
    <div className="p-4 max-w-md mx-auto bg-stone-200">
      <h1 className="text-xl font-bold mb-4 text-gray-800">管理者 認証</h1>
      <input
        className="rounded-lg border p-2 w-full mb-2 text-black border border-transparent transition-colors duration-200 hover:border-black"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="ユーザー名"
      />
      <input
        className="rounded-lg border p-2 w-full mb-2 text-black border border-transparent transition-colors duration-200 hover:border-black"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="パスワード"
      />
      <button
        onClick={handleLogin}
        className="rounded-lg bg-sky-300 text-gray-800 p-2 w-full mb-2 border border-transparent transition-colors duration-200 hover:border-black"
      >
        ログイン
      </button>
      <button
        onClick={checkAuth}
        className="rounded-lg bg-emerald-300 text-gray-800 p-2 w-full mb-2 border border-transparent transition-colors duration-200 hover:border-black"
      >
        認証チェック
      </button>
      <button
        onClick={handleLogout}
        className="rounded-lg bg-rose-400 text-gray-800 p-2 w-full mb-2 border border-transparent transition-colors duration-200 hover:border-black"
      >
        ログアウト
      </button>
    </div>
    </div>
  );
}
