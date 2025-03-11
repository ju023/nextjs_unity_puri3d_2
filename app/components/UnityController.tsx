import React from "react";
import styles from "../styles/UnityApp.module.css";
import { useCreateUnityContext } from "../lib/unity-context";

// UnityController コンポーネントの Props の型定義
interface UnityControllerProps {
  unityContext: ReturnType<typeof useCreateUnityContext>;
}

// NextjsとUnityでの通信用の処理(ボタン関係)
export const UnityController: React.FC<UnityControllerProps> = ({ unityContext }) => {
  const { isLoaded, sendMessage } = unityContext;

  // NextjsからUnityへ通信（テスト）の処理
  const sendToUnity = () => {
    if (isLoaded) {
      sendMessage("UnityWebGL", "OnButtonPressed", "ボタンが押されました");
    } else {
      console.warn("Unity がまだロードされていません");
    }
  };

  // NextjsからUnityへ通信（ズームイン）の処理
  const sendToZoomInUnity = () => {
    if (isLoaded) {
      sendMessage("UnityWebGL", "OnZoomInBtnPressed", "ボタンが押されました");
    } else {
      console.warn("Unity がまだロードされていません");
    }
  };

  // NextjsからUnityへ通信（ズームアウト）の処理
  const sendToZoomOutUnity = () => {
    if (isLoaded) {
      sendMessage("UnityWebGL", "OnZoomOutBtnPressed", "ボタンが押されました");
    } else {
      console.warn("Unity がまだロードされていません");
    }
  };

  return (
    <div className="flex justify-evenly items-center gap-8 font-cinecaption">
      <button onClick={sendToUnity} className={styles.button}>
        Unity に送信
      </button>
      <button onClick={sendToZoomInUnity} className={styles.button}>
        ZoomIn を送信
      </button>
      <button onClick={sendToZoomOutUnity} className={styles.button}>
        ZoomOut を送信
      </button>
    </div>
  );
};

export default UnityController;
