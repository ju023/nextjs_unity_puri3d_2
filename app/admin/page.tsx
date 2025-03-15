// app/components/admin/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // 追加
import { loginClient, isAuthenticatedClient, logoutClient } from "../lib/admin/admin-auth-client";

export default function AdminLogin() {
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
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">管理者 認証</h1>
      <input
        className="border p-2 w-full mb-2 text-black"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="ユーザー名"
      />
      <input
        className="border p-2 w-full mb-2 text-black"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="パスワード"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white p-2 w-full mb-2"
      >
        ログイン
      </button>
      <button
        onClick={checkAuth}
        className="bg-green-500 text-white p-2 w-full mb-2"
      >
        認証チェック
      </button>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white p-2 w-full mb-2"
      >
        ログアウト
      </button>
    </div>
  );
}
