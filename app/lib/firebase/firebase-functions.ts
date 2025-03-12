// Firebase操作用の関数ファイル
// app/lib/firebase/firebase-functions.ts
import { saveMessage, getMessages } from "./firebase-db";
import { signInWithGoogle, logOut,  } from "./firebase-auth";
import { signInAnonymously, signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import { signUpWithEmail, loginWithEmail } from "./firebase-auth";

export const sendFirebaseMessage = async (message: string, userId: string) => {
  await saveMessage(message, userId);
};

export const fetchFirebaseMessages = async () => {
  return await getMessages();
};

export const loginWithGoogle = async () => {
  return await signInWithGoogle();
};

/*
export const logoutFromFirebase = async () => {
  await logOut();
};
*/

// 匿名ログイン
export const loginAnonymously = async () => {
  try {
    const result = await signInAnonymously(auth);
    console.log("匿名ログイン成功:", result.user);
  } catch (error) {
    console.error("匿名ログインに失敗:", error);
  }
};
  
// ログアウト
export const logoutFromFirebase = async () => {
  try {
    await signOut(auth);
    console.log("ログアウトしました");
  } catch (error) {
    console.error("ログアウトに失敗:", error);
  }
};

export const registerUser = async (email: string, password: string) => {
  return await signUpWithEmail(email, password);
};

export const loginUser = async (email: string, password: string) => {
  return await loginWithEmail(email, password);
};