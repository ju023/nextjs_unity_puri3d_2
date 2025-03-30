// app/components/unitypage/UnityFlagManager.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCreateUnityContext } from "../../lib/unity/unity-context";
// import { UnityControllerProps } from '@/app/lib/unity/unity-interface';
// import { SaveData } from '@/app/lib/firebase/firebase-interface';

// Context の作成
export const SavedataFlagContext = createContext<{
  savedataFlag: boolean;
  IsLoginUidFlag: string;
  unityContext: ReturnType<typeof useCreateUnityContext>; // null を許容しない
  setFlagTrue: () => void;
  setFlagFalse: () => void;
  setLoginUidFlagFnc: (userId: string) => void;
  // setTestNumber: () => void;
}>({
  savedataFlag: false,
  IsLoginUidFlag: "",
  unityContext: {} as ReturnType<typeof useCreateUnityContext>, // null を許容しない
  setFlagTrue: () => {},
  setFlagFalse: () => {},
  setLoginUidFlagFnc: () => {},
  // setTestNumber: () => {},
});

// UnityContext 型を使用してコンテキストを作成
// export const UnityContextApi = React.createContext<useCreateUnityContext | undefined>(undefined);

/*
export const SavedataFlagContext2 = createContext<{
  savedataFlg2: string;
}>({savedataFlg2: ""})
*/

// Context Provider の作成
export const SavedataFlagProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedataFlag, setSavedataFlag] = useState(false);
  const [IsLoginUidFlag, setLoginUidFlag] = useState<string>("");
  // const [ IsSaveDataFlag, setSaveDataFlag ] = useState<boolean>(false);
  // const [IsTest, SetTest] = useState<number>(0);

  /*
  const setTestNumber = () => {
    SetTest(prevState => prevState + 1);
  };
  */
  const unityContext = useCreateUnityContext(); // 外部の関数を呼び出す

  const setFlagTrue = () => {
    setSavedataFlag(prevState => prevState = true);
  };

  const setFlagFalse = () => {
    setSavedataFlag(prevState => prevState = false);
  };
  

  /*
  const setFlagTrue = () => {
    setSavedataFlag((prevState) => {
      const newState = true;
      console.log("setFlagTrue: 即時反映", newState);
      return newState;
    });
  };
  
  const setFlagFalse = () => {
    setSavedataFlag((prevState) => {
      const newState = false;
      console.log("setFlagFalse: 即時反映", newState);
      return newState;
    });
  };
 
  const setLoginUidFlagFnc = (userId: string) => {
    setLoginUidFlag(prevState =>prevState = userId);
    console.log("UnityFlagManager setLoginUidFlagFncユーザーIDが設定:", IsLoginUidFlag);
  };
  */

  const setLoginUidFlagFnc = (userId: string) => {
    setLoginUidFlag(prevMessage =>prevMessage = userId);
    console.log("UnityFlagManager setLoginUidFlagFncユーザーIDが設定:", IsLoginUidFlag);
  };

  useEffect(() => {
    console.log("UnityFlagManager.tsxのIsLoginUidFlagの値:", IsLoginUidFlag);
  }, [IsLoginUidFlag]);
  

  return (
    <SavedataFlagContext.Provider
      value={{
        savedataFlag,
        IsLoginUidFlag,
        unityContext,
        setFlagTrue,
        setFlagFalse,
        setLoginUidFlagFnc,
        // setTestNumber,
      }}
    >
      {children}
    </SavedataFlagContext.Provider>
  );
};

// Unity: NextjsからUnityにセーブデータを送信する処理
/*
export const UnityFncSendSaveData = ({ unityContext }: UnityControllerProps): void => {
    const { sendMessage } = unityContext;

    const sendDataToUnityManager = async(messages_savedata: SaveData) => {
        // test3 = "wwq"
        // test3 = isSendData;
        if (messages_savedata) {
          console.warn("test3 = " , messages_savedata);
          sendMessage("UnityWebGL", "OnButtonPressed", JSON.stringify(messages_savedata));
        } else {
          console.warn("Unity がまだロードされていません");
        }
      };

}
*/

// Context を使用するためのカスタムフック
export const useSavedataFlag = () => useContext(SavedataFlagContext);
