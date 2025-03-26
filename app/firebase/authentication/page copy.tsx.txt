// app/firebase/authentication/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { loginWithGoogle,
         logoutFromFirebase,
         loginAnonymously,
         registerUser,
         loginUser } from "../../lib/firebase/firebase-functions";
import { auth } from "../../lib/firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
// import { adminisAuthenticatedClient, adminLogoutClient } from "../../lib/admin/admin-auth"; // クライアントサイド用の関数を使用

const AuthPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(auth.currentUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [loginMethod, setLoginMethod] = useState<string | null>(null);

  // 管理者認証チェック & リダイレクト
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/admin"); // 修正
        const data = await res.json();
        if (!data.isAuthenticated) {
          router.replace("/admin");
        }
      } catch (error) {
        console.error("認証チェック中にエラー:", error);
        router.replace("/admin");
      }
    };

    checkAuth();
  }, [router]);

  /*
  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("/api/admin-auth");
      if (!res.ok) {
        router.push("/admin");
      }
    };

    checkAuth();
  }, [router]);
  */


  //
  // 管理者認証状態の確認とリダイレクト (クライアントサイドでの念のためのチェック - Middlewareで保護されているため基本不要)
  //
  /*
  useEffect(() => {
    if (!adminisAuthenticatedClient()) {
      router.push("/admin"); // 認証されていなければ管理者ログインページへ
    }
  }, [router]);
  */

  //
  // firebase外に遷移の時に管理者ログアウト処理
  //
  useEffect(() => {
    const handleRouteChange = async () => {
      if (pathname !== "/firebase" && pathname !== "/firebase/authentication") {
        await fetch("/api/logout");
      }
    };

    handleRouteChange(); // 初期ロード時にも実行

  }, [pathname]);

  //
  // Firebaseユーザー認証状態の監視
  //
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        router.push("/firebase");
      }
    });
    return () => unsubscribe();
  }, [router]);


  //
  // page.tsxの表示
  //
  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Firebase 認証</h1>
      {user ? (
        <div>
          <p>ログイン中: {user.displayName || "匿名ユーザー"}</p>
          <button onClick={logoutFromFirebase} className="bg-red-500 text-white p-2 w-full mt-4">
            ログアウト
          </button>
        </div>
      ) : (
        <>
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full mb-2 text-black"
          />
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full mb-2 text-black"
          />
          <button onClick={() => registerUser(email, password)} className="bg-blue-500 text-white p-2 w-full mb-20">
            メールで登録
          </button>
          <button onClick={() => loginUser(email, password)} className="bg-green-500 text-white p-2 w-full mb-2">
            メールでログイン
          </button>
          <button onClick={loginWithGoogle} className="bg-yellow-500 text-white p-2 w-full mb-2">
            Googleでログイン
          </button>
          <button onClick={loginAnonymously} className="bg-gray-500 text-white p-2 w-full">
            匿名ログイン
          </button>
        </>
      )}
    </div>
  );
};

export default AuthPage;