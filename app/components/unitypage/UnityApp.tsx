//app/components/unitypage/UnityApp.tsx

import React, { useEffect
                ,useState
                ,useRef 
                // ,useContext
              } from "react";
// import { useCreateUnityContext } from "../../lib/unity/unity-context";
import UnityDisplay from "./UnityDisplay";
import UnityController from "./UnityController";
import { UnityHeader } from "../header/UnityHeader";
// import UnityExitBtn from "./UnityExitBtn";
import styles from "../../styles/UnityApp.module.css";
import { auth } from "../../lib/firebase/firebase-config"; // Firebase Authentication の auth をインポート
import { onAuthStateChanged } from "firebase/auth"; // onAuthStateChanged をインポート
import { useRouter } from "next/navigation"; // useRouter をインポート
import { getSelectMessage, getSelectSaveData } from "@/app/lib/firebase/firebase-db";
import { useSavedataFlag, SavedataFlagProvider } from "./UnityFlagManager"; // フラグ管理フックをインポート

// import { UnityFncSendSaveData } from "./UnityFlagManager";
import {  // Message,
          SaveData,  } from "@/app/lib/firebase/firebase-interface";
//import { UnityControllerProps } from "@/app/lib/unity/unity-interface";


// Unity画面をここで統合する（主に表示のみ行う）
export const UnityAppContent: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // ログイン状態を管理する state
  const [showLoginLightbox, setShowLoginLightbox] = useState(false); // ライトボックスの表示状態を管理する state
  const router = useRouter(); // useRouter を初期化
  // const [isLoginUid, setLoginUid] = useState(String); // 取得したいメッセージのuid
  const [isLoginUidReady, setIsLoginUidReady] = useState(false); // isLoginUid設定完了フラグ
  const isFirstRender = useRef(true); // 初回レンダリングフラグ
  // const { IsUidflagRef } = useSavedataFlag(); // フラグと操作関数を取得
  // Context からフラグを取得・操作
  const { IsLoginUidFlag, setLoginUidFlagFnc, savedataFlag, unityContext } = useSavedataFlag();
  // UnityContextを定義
  // const unityContext2 = useCreateUnityContext(); 
  // const sendDataToUnityManager = UnityFncSendSaveData(unityContext);
  // const test4: string = "ssaa";
  // const contextValue = useContext(SavedataFlagContext2);
  

  // 1:Unityページに遷移:最初にログイン済みか検証
  useEffect(() => {
    if (!isLoginUidReady) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setIsLoggedIn(!!user); // ログイン状態を更新
        if (user) {
            console.log("ログイン済み");
            // console.log(user.uid); // ID(uid)の確認。これでDBとデータを紐づけできるかも？
            // setLoginUid(user.uid);  // ログインユーザーを変数に保持
            setIsLoginUidReady(true); // isLoginUid設定完了
            console.log("user = ", user.uid);
            // console.log("isLoginUid = ", isLoginUid);
            // Context API経由でUIDを設定
            setLoginUidFlagFnc(user.uid);
            // console.log("IsLoginUidFlag = ", IsLoginUidFlag);
            // contextValue = "";
            // setLoginUidFlagFnc(isLoginUid);    // グローバルで保持するためUnityFlagManager.tsxに設定
        } else {
            console.log("未ログイン");
            setShowLoginLightbox(true); // ライトボックスを表示
            console.log(showLoginLightbox);
        }
      });

      return () => unsubscribe(); // クリーンアップ関数
    }
  })

  /*
  useEffect(() => {
    console.log("UnityApptsxのIsLoginUidFlagの値:", IsLoginUidFlag);  // 値の変更を監視
  }, [IsLoginUidFlag]);
  */
  

  // 2:ログインユーザーの最新情報を取得
  useEffect(() => {
    if (isFirstRender.current && isLoginUidReady) {

      const checkLogInUser = async() => {
        const messages = await getSelectMessage(IsLoginUidFlag);
        if (messages.length > 0) {
          console.log("最新メッセージ:", messages[0]);
          isFirstRender.current = false; // 初回レンダリングフラグを false に設定
        } else {
          console.log("メッセージはありません。");
        }
      };

      checkLogInUser();

    }
  }, [IsLoginUidFlag, isLoginUidReady])  // isLoginUid を依存配列に追加

  // 3:ログインユーザーの最新セーブデータを取得
  useEffect(() => {
    console.log("IsLoginUidFlag = ", IsLoginUidFlag)
    if (savedataFlag) {

      const checkLogInUserSaveData = async() => {
        const savedata = await getSelectSaveData(IsLoginUidFlag);
        if (savedata.length > 0) {
          console.log("最新セーブデータ:", savedata[0]);
          isFirstRender.current = false; // 初回レンダリングフラグを false に設定
          // sendDataToUnity1(savedata[0]);
          // sendDataToUnity();
          sendDataToUnity(savedata[0]);
        } else {
          console.log("セーブデータはありません。");
        }
      };

      checkLogInUserSaveData();
      // setFlagFalse(); // 処理実行後にフラグを false に設定

    }
  }, [IsLoginUidFlag, isLoginUidReady, savedataFlag]);


  //
  // Unity: 4_ゲーム開始NextjsからUnityにセーブデータを送信する処理
  //
  const sendDataToUnity = async (messages_savedata: SaveData) => {
    if (unityContext && unityContext.sendMessage) {
    // const { sendMessage } = unityContext;
    // const sendDataToUnity = async(messages_savedata: SaveData) => {
      if (messages_savedata) {
        console.warn("NextjsからUnityへ送信データ: = " , messages_savedata);
        unityContext.sendMessage("UnityWebGL", "OnButtonPressed", "savedata_get" + JSON.stringify(messages_savedata));
      } else {
        console.warn("送信データがありません");
      }
    } else {
      console.warn("Unity がまだロードされていません");
    }
  };

  /*
  const sendDataToUnity1 = async(messages_savedata: SaveData) => {
    // test3 = "wwq"
    // test3 = isSendData;
    if (messages_savedata) {
      console.warn("test3 = " , messages_savedata);
      sendMessage("UnityWebGL", "OnButtonPressed", isSendData);
    } else {
      console.warn("Unity がまだロードされていません");
    }
  };
  */

  // const unityContext = useCreateUnityContext(); // 外部の関数を呼び出す

  // ログイン状態の場合はローディング表示
  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }

  //
  // unity/page.tsxに表示する内容
  //
  // Unityページに遷移:未ログインの場合はレンダリング中止しTopページに遷移する
  if (!isLoggedIn) {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center font-cinecaption">
            <div className="bg-white p-8 rounded-lg">
                <p className="text-lg mb-4 text-gray-800">ログインを行ってください。</p>
                <div className="flex justify-around">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={() => router.push("/")}>Topページ</button>
                </div>
            </div>
        </div>
    );
  }

  return (
    <div className={styles.unityContainer}>
      {/*<UnityExitBtn />*/}
      <header className="fixed w-full justify-center top-0 flex flex-col md:flex-row  items-center p-2 bg-green-100 shadow">
      <UnityHeader />
      </header>
      {/*<UnityHeader unityContext={unityContext} sendMessage={unityContext.sendMessage}/>*/}
      {/* unityContext を渡す */}
      <UnityDisplay unityContext={unityContext} />
      <UnityController unityContext={unityContext} sendMessage={unityContext.sendMessage}/>
    </div>
  );
};

export const UnityApp: React.FC = () => {
  return (
    <SavedataFlagProvider>
      <UnityAppContent />
    </SavedataFlagProvider>
  );
};

export default UnityApp;
