// app/firebase/authentication/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginWithGoogle,
          logoutFromFirebase,
          loginAnonymously,
          registerUser,
          loginUser } from "../../lib/firebase/firebase-functions";
import { auth } from "../../lib/firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";

const AuthPage = () => {
  const router = useRouter();
  const [user, setUser] = useState(auth.currentUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        router.push("/firebase");
      }
    });
    return () => unsubscribe();
  }, [router]);

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
          <button onClick={() => registerUser(email, password)} className="bg-blue-500 text-white p-2 w-full mb-2">
            登録
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