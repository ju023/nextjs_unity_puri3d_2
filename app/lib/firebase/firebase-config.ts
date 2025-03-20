// app/lib/firebase/firebase-config.ts
// Firebaseの設定ファイル 
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase の設定（環境変数を使用）
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Firebase アプリを初期化
const app = initializeApp(firebaseConfig);
// Firebase APIキーなどの情報が正しいかなど確認し初期化
const db = getFirestore(app);
// Firebase 登録ユーザーの認証情報を取得処理。ユーザーIDや、登録メールアドレスなど、ユーザー登録した際に、ユーザーに紐づけられた情報を取得
const auth = getAuth(app);

export { app, db, auth };
