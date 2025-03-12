// app/lib/firebase/firebase-db.ts
// Firestoreのデータベース操作ファイル
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase-config";

const COLLECTION_NAME = "messages";

export const saveMessage = async (message: string, userId: string) => {
  try {
    await addDoc(collection(db, COLLECTION_NAME), {
      text: message,
      userId,
      createdAt: new Date(),
    });
    console.log("メッセージを保存しました:", message);
  } catch (error) {
    console.error("メッセージの保存に失敗:", error);
  }
};

export const getMessages = async (): Promise<{ text: string; userId: string }[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    return querySnapshot.docs.map((doc) => doc.data() as { text: string; userId: string });
  } catch (error) {
    console.error("メッセージの取得に失敗:", error);
    return [];
  }
};
