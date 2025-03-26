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

const AuthPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(auth.currentUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    <div className="p-20 bg-stone-200 min-h-screen font-cinecaption text-gray-800">
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Firebase test認証</h1>
      {user ? (
        <div>
          <p>ログイン中: {user.displayName || "匿名ユーザー"}</p>
          <button onClick={logoutFromFirebase} className="rounded-lg bg-red-500 text-white p-2 w-full mt-4 border border-transparent transition-colors duration-200 hover:border-black">
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
            className="rounded-lg border p-2 w-full mb-2 text-black border border-transparent transition-colors duration-200 hover:border-black"
          />
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg border p-2 w-full mb-2 text-black border border-transparent transition-colors duration-200 hover:border-black"
          />
          <button onClick={() => registerUser(email, password)} className="rounded-lg bg-blue-500 text-white p-2 w-full mb-20 border border-transparent transition-colors duration-200 hover:border-black">
            メールで登録
          </button>
          <button onClick={() => loginUser(email, password)} className="rounded-lg bg-green-500 text-white p-2 w-full mb-2 border border-transparent transition-colors duration-200 hover:border-black">
            メールでログイン
          </button>
          <button onClick={loginWithGoogle} className="rounded-lg bg-yellow-500 text-white p-2 w-full mb-2 border border-transparent transition-colors duration-200 hover:border-black">
            Googleでログイン
          </button>
          <button onClick={loginAnonymously} className="rounded-lg bg-gray-500 text-white p-2 w-full border border-transparent transition-colors duration-200 hover:border-black">
            匿名ログイン
          </button>
        </>
      )}
    </div>
    </div>
  );
};

export default AuthPage;