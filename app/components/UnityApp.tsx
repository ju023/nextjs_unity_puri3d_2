import React from "react";
import { useCreateUnityContext } from "../lib/unity-context";
import UnityDisplay from "./UnityDisplay";
import UnityController from "./UnityController";
import UnityExitBtn from "./UnityExitBtn";
import styles from "../styles/UnityApp.module.css";

// Unity画面をここで統合する（主に表示のみ行う）
export const UnityApp: React.FC = () => {
  const unityContext = useCreateUnityContext(); // 外部の関数を呼び出す

  return (
    <div className={styles.unityContainer}>
      <UnityExitBtn />
      {/* unityContext を渡す */}
      <UnityDisplay unityContext={unityContext} />
      <UnityController unityContext={unityContext} />
    </div>
  );
};

export default UnityApp;
