// app/firebase/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { sendFirebaseMessage,
          fetchFirebaseMessages,
          logoutFromFirebase} from "../../lib/firebase/firebase-functions";
import { auth } from "../../lib/firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
//import { adminisAuthenticatedClient } from "../lib/admin/admin-auth";   // クライアントサイド用の関数を使用

const FirebaseTestPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ text: string; userId: string }[]>([]);
  const [user, setUser] = useState(auth.currentUser);
  const [loginMethod, setLoginMethod] = useState<string | null>(null);

  //
  // 管理者認証チェック & リダイレクト
  //
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/admin", { credentials: "include" }); // ✅ クッキーを送信
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
        await fetch("/api/admin");
      }
    };
    handleRouteChange(); // 初期ロード時にも実行
  }, [pathname]);

  //
  // Firebaseユーザー認証状態の監視
  //
  useEffect(() => {
    // onAuthStateChangedで認証状態の変更を監視し、ユーザー情報を更新
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // ユーザーが存在する場合、ログイン方法を設定
      if (currentUser) {
        setLoginMethod(
          currentUser.isAnonymous
            ? "匿名"
            : currentUser.providerData[0].providerId === "google.com"
            ? "Google"
            : "メール"
        );
      // ユーザーが存在しない場合、ログイン方法をnullに設定
      } else {
        // ユーザーが存在しない場合、ログイン方法をnullに設定
        setLoginMethod(null);
        // ログアウト時にログイン画面へ遷移
        router.push("/firebase/authentication");
      }
    });
    // コンポーネントのアンマウント時に監視を解除
    return () => unsubscribe();
  }, [router]);


  //
  // Firebaseメッセージのロード
  //
  useEffect(() => {
    const loadMessages = async () => {
      // Firebaseからメッセージを取得
      const fetchedMessages = await fetchFirebaseMessages();
      // 取得したメッセージを状態に設定
      setMessages(fetchedMessages);
    };
    // メッセージをロード
    loadMessages();
    // 依存配列を空にすることで、コンポーネントのマウント時に一度だけ実行
  }, []);

  //
  // Firebaseメッセージ送信処理
  //
  const handleSendMessage = async () => {
    // メッセージが空またはユーザーが存在しない場合は処理を中断
    if (!message.trim() || !user) return;
    // Firebaseにメッセージを送信
    await sendFirebaseMessage(message, user.uid);
    // 入力欄をクリア
    setMessage("");
    // メッセージを再取得し、状態を更新
    const fetchedMessages = await fetchFirebaseMessages();
    setMessages(fetchedMessages);
  };


  //
  // page.tsxの表示
  //
  return (
    <div className="p-20 bg-stone-200 min-h-screen font-cinecaption text-gray-800">
        <div className="p-4 max-w-md mx-auto">
        <h1 className="text-xl font-bold mb-4">Firebase 接続テスト</h1>
        {user ? (
            <>
            <p className="mb-2">ログイン中: {loginMethod}</p>
            <button onClick={async () => { 
                // Firebaseからログアウト
                await logoutFromFirebase();
                // ログアウト後にログイン画面へ遷移
                router.push("/firebase/authentication"); // 念のため再遷移
            }} className="bg-red-500 text-white p-2 w-full mb-4 rounded-lg border border-transparent transition-colors duration-200 hover:border-black">
                ログアウト
            </button>

            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="メッセージを入力"
                className="border p-2 w-full mb-2 rounded-lg border border-transparent transition-colors duration-200 hover:border-black"
            />
            <button onClick={handleSendMessage} className="bg-blue-500 text-white p-2 w-full mb-4 rounded-lg border border-transparent transition-colors duration-200 hover:border-black">
                送信
            </button>

            <h2 className="text-lg font-semibold">保存されたメッセージ:</h2>
            <ul className="list-disc pl-5">
                {messages.map((msg, index) => (
                <li key={index}>{msg.text} (User: {msg.userId === user.uid ? "あなた" : msg.userId})</li>
                ))}
            </ul>
            </>
        ) : (
            <p>ログインしてください。</p>
        )}
        </div>
    </div>
  );

};

export default FirebaseTestPage;
