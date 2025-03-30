// app/lib/firebase/firebase-db.ts
// Firestoreのデータベース操作ファイル
import { collection
        ,addDoc
        ,getDocs
        ,query
        ,where
        ,orderBy
        ,limit
        ,DocumentData
       } from "firebase/firestore";
import { db } from "./firebase-config";
import { SaveData, Message } from "./firebase-interface";

const COLLECTION_NAME = "messages";
const COLLECTION_NAME_SAVE = "savedatas";

/*
interface Message {
  id: string;
  text: string;
  userId: string;
  createdAt: Date;
}

interface SaveData {
  id: string;
  data_coord: string;
  userId: string;
  createdAt: Date;
}
*/

// FirebaseDB messagesコレクションにデータを保存処理
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

// FirebaseDB savedatasコレクションにデータを保存処理
export const saveSavedatas = async (message: string, userId: string) => {
  try {
    await addDoc(collection(db, COLLECTION_NAME_SAVE), {
      data_coord: message,
      userId,
      createdAt: new Date(),
    });
    console.log("セーブデータを保存しました:", message);
  } catch (error) {
    console.error("セーブデータの保存に失敗:", error);
  }
};

// FirebaseDB 全てのデータを取得処理
export const getMessages = async (): Promise<{ text: string; userId: string }[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    return querySnapshot.docs.map((doc) => doc.data() as { text: string; userId: string });
  } catch (error) {
    console.error("メッセージの取得に失敗:", error);
    return [];
  }
};

// FirebaseDB ユーザー名から最新のデータを取得処理
export const getSelectMessage = async (userId: string): Promise<Message[]> => {
  try {
    const messagesRef = collection(db, COLLECTION_NAME);
    // データ取得条件
    const q = query(
      messagesRef,
      where("userId", "==", userId), // uidが一致するドキュメントを抽出
      orderBy("createdAt", "desc"), // createdAtの降順で並び替え
      limit(1) // 最新の1件のみ取得
    );

    const querySnapshot = await getDocs(q); // データ取得条件を指定しデータを格納
    const messages: Message[] = []; // 結果を格納する配列

    querySnapshot.forEach((doc) => {
      const data = doc.data() as DocumentData;
      messages.push({
        id: doc.id,
        text: data.text,
        userId: data.userId,
        createdAt: data.createdAt.toDate(), // FirestoreのTimestampをDateに変換
      });
    });

    return messages;
  } catch (error) {
    console.error("メッセージ取得エラー:", error);
    return []; // エラー時は空の配列を返す
  }
  
};


// FirebaseDB ユーザー名から最新のセーブデータを取得処理
export const getSelectSaveData = async (userId: string): Promise<SaveData[]> => {
  try {
    const messagesRef = collection(db, COLLECTION_NAME_SAVE);
    // データ取得条件
    const q = query(
      messagesRef,
      where("userId", "==", userId), // uidが一致するドキュメントを抽出
      orderBy("createdAt", "desc"), // createdAtの降順で並び替え
      limit(1) // 最新の1件のみ取得
    );

    const querySnapshot = await getDocs(q); // データ取得条件を指定しデータを格納
    const savedatas: SaveData[] = []; // 結果を格納する配列

    querySnapshot.forEach((doc) => {
      const data = doc.data() as DocumentData;
      savedatas.push({
        id: doc.id,
        data_coord: data.data_coord,
        userId: data.userId,
        createdAt: data.createdAt.toDate(), // FirestoreのTimestampをDateに変換
      });
    });

    return savedatas;
  } catch (error) {
    console.error("メッセージ取得エラー:", error);
    return []; // エラー時は空の配列を返す
  }
  
};