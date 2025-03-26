// app/lib/firebase/firebase-interface.ts
// 型宣言用のファイル

export interface Message {
  id: string;
  text: string;
  userId: string;
  createdAt: Date;
}
  
export interface SaveData {
  id: string;
  data_coord: string;
  userId: string;
  createdAt: Date;
}