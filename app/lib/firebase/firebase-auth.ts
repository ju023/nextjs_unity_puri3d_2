import { GoogleAuthProvider,
          signInWithPopup,
          signOut,
          createUserWithEmailAndPassword,
          signInWithEmailAndPassword, } from "firebase/auth";
import { auth } from "./firebase-config";

const provider = new GoogleAuthProvider();

// Googleログイン
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Googleログインに失敗:", error);
    return null;
  }
};
// Googleログアウト
export const logOut = async () => {
  try {
    await signOut(auth);
    console.log("ログアウトしました");
  } catch (error) {
    console.error("ログアウトに失敗:", error);
  }
};

// メールとパスワードで新規登録
export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("登録成功:", userCredential.user);
  } catch (error) {
    console.error("登録失敗:", error);
  }
};

// メールとパスワードでログイン
export const loginWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("ログイン成功:", userCredential.user);
  } catch (error) {
    console.error("ログイン失敗:", error);
  }
};