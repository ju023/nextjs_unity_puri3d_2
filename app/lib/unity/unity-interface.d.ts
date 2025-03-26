// app/lib/unity/unity-interface.ts
// 型宣言用のファイル

import { useCreateUnityContext } from "../../lib/unity/unity-context";

// UnityController コンポーネントの Props の型定義
export interface UnityControllerProps {
  unityContext: ReturnType<typeof useCreateUnityContext>;
  sendMessage: (objectName: string, methodName: string, message: string) => void; // sendMessage プロパティを追加
}