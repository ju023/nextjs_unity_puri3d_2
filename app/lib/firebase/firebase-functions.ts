// Firebase操作用の関数ファイル（firebase系の操作はこのファイルから使用する。処理の一元管理）
// app/lib/firebase/firebase-functions.ts
import { saveMessage, saveSavedatas, getMessages, getSelectSaveData } from "./firebase-db";
import { signInWithGoogle } from "./firebase-auth";
import { signInAnonymously, signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import { signUpWithEmail, loginWithEmail } from "./firebase-auth";

// DB：メッセージデータMsg設定の処理
export const sendFirebaseMessage = async (message: string, userId: string) => {
  await saveMessage(message, userId);
};

// DB：セーブデータ設定のMsg処理
export const sendFirebasesaveSavedatas = async (message: string, userId: string) => {
  await saveSavedatas(message, userId);
};

// DB：全データ取得の処理
export const fetchFirebaseMessages = async () => {
  return await getMessages();
};

// DB：最新セーブデータ1件取得の処理
export const fetchFirebaseSelectSaveData = async (userId: string) => {
  return await getSelectSaveData(userId);
};

// ユーザー：Googleログイン処理
export const loginWithGoogle = async () => {
  return await signInWithGoogle();
};

// ユーザー：匿名ログイン処理
export const loginAnonymously = async () => {
  try {
    const result = await signInAnonymously(auth);
    console.log("匿名ログイン成功:", result.user);
  } catch (error) {
    console.error("匿名ログインに失敗:", error);
  }
};
  
// ユーザー：ログアウト処理
export const logoutFromFirebase = async () => {
  try {
    await signOut(auth);
    console.log("ログアウトしました");
  } catch (error) {
    console.error("ログアウトに失敗:", error);
  }
};

// ユーザー：メールログインの新規作成の処理
export const registerUser = async (email: string, password: string) => {
  return await signUpWithEmail(email, password);
};

// ユーザー：メールログインの処理
export const loginUser = async (email: string, password: string) => {
  return await loginWithEmail(email, password);
};