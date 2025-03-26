//app/components/unitypage/UnityController.tsx
"use client;"

import React, { useEffect, useState } from "react";
import styles from "../../styles/UnityApp.module.css";
// import { useCreateUnityContext } from "../../lib/unity/unity-context";
// import useSavedataFlag from "./UnityFlagManager"; // フラグ管理フックをインポート
// import { getSelectSaveData } from "@/app/lib/firebase/firebase-db";
import { useSavedataFlag } from "./UnityFlagManager"; // フラグ管理フックをインポート
import { UnityControllerProps } from "@/app/lib/unity/unity-interface";

// windowオブジェクトの型拡張
declare global {
  interface Window {
    SendMessageToNextJSFunction?: (message: string) => void;
    SendDataToNextJSFunction?: (savedata: string) => void;
  }
}

// NextjsとUnityでの通信用の処理(ボタン関係)
export const UnityController: React.FC<UnityControllerProps> = ({ unityContext }) => {
  const { isLoaded, sendMessage } = unityContext;
  const [ isSendData, setIssendData ] = useState<string>("");
  // const { setFlagTrue } = useSavedataFlag(); // フラグ操作関数を取得
  // const { savedataFlag, setFlagFalse, IsLoginUidFlag } = useSavedataFlag(); // フラグと操作関数を取得
  const { /* IsLoginUidFlag, setLoginUidFlagFnc, */ setFlagTrue } = useSavedataFlag();
  // const test2: string = "002:212:114";
  // let test3: string = "21";

  // Unityから受信しNextjsから送信する処理：メッセージ
  useEffect(() => {
    // Unityからのメッセージを受信する関数
    if (isLoaded) {
    window.SendMessageToNextJSFunction = (message: string) => {
      console.log("Unity から受信:", message);
      // ここでメッセージを処理する
      // savedataのアクセスの場合以下の処理
      if (message == "savedata_pls") {
        console.log("savedataの処理:", message);
        setIssendData("001:221:221");
        console.log(isSendData);
        // setFlagTrue(); // フラグを true に設定
        setFlagTrue();  // フラグを true に設定
      }
    };
   }
    // コンポーネントのアンマウント時に関数を削除
    return () => {
      if (window.SendMessageToNextJSFunction) {
        delete window.SendMessageToNextJSFunction;
      }
    };
  }, [isLoaded, /*setFlagTrue*/]); // isLoaded の変化を監視
  

  /*
  // 3:ログインユーザーの最新セーブデータを取得
    useEffect(() => {
      if (savedataFlag) {
  
        const checkLogInUserSaveData = async() => {
          const messages = await getSelectSaveData(IsLoginUidFlag);
          if (messages.length > 0) {
            console.log("最新セーブデータ:", messages[0]);
            // isFirstRender.current = false; // 初回レンダリングフラグを false に設定
          } else {
            console.log("セーブデータはありません。");
          }
        };
  
        checkLogInUserSaveData();
        setFlagFalse(); // 処理実行後にフラグを false に設定
  
      }
    }, [savedataFlag]);
    */

  /*
  useEffect(() => {
    sendDataToUnity();
  }, [isSendData]);
  */

  /*
  // Unityから受信しNextjsから送信する処理：セーブデータ
  useEffect(() => {
    // Unityからのメッセージを受信する関数
    window.SendDataToNextJSFunction = (savedata: string) => {
      console.log("Unity から受信 (セーブデータ):", savedata);
      // ここでセーブデータを処理する
      try {
        const vector3 = JSON.parse(savedata);
        console.log("Vector3:", vector3);
        // vector3 を使用した処理
      } catch (error) {
        console.error("セーブデータの解析に失敗しました:", error);
      }
    };

    // コンポーネントのアンマウント時に関数を削除
    return () => {
      if (window.SendDataToNextJSFunction) {
        delete window.SendDataToNextJSFunction;
      }
    };
  }, []);
  */
  
  /*
  const sendDataToUnity = () => {
    test3 = "wwq"
    test3 = isSendData;
    if (isLoaded) {
      console.warn("test3 = " , isSendData);
      sendMessage("UnityWebGL", "OnButtonPressed", isSendData);
    } else {
      console.warn("Unity がまだロードされていません");
    }
  };
  */

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
