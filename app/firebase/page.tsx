"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { sendFirebaseMessage, fetchFirebaseMessages, logoutFromFirebase } from "../lib/firebase/firebase-functions";
import { auth } from "../lib/firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";

const FirebaseTestPage = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ text: string; userId: string }[]>([]);
  const [user, setUser] = useState(auth.currentUser);
  const [loginMethod, setLoginMethod] = useState<string | null>(null);

  // ユーザー認証状態の変更を監視する
  useEffect(() => {
    // onAuthStateChangedで認証状態の変更を監視し、ユーザー情報を更新
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // ユーザーが存在する場合、ログイン方法を設定
      if (currentUser) {
        setLoginMethod(currentUser.isAnonymous ? "匿名" : (currentUser.providerData[0].providerId === "google.com" ? "Google" : "メール"));
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

  // メッセージをロードする
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

  // メッセージ送信処理
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

  return (
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
          }} className="bg-red-500 text-white p-2 w-full mb-4">
            ログアウト
          </button>

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="メッセージを入力"
            className="border p-2 w-full mb-2"
          />
          <button onClick={handleSendMessage} className="bg-blue-500 text-white p-2 w-full mb-4">
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
  );
};

export default FirebaseTestPage;
