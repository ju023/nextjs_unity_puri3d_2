// "use client";

import React, { useState, useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import styles from "../styles/UnityApp.module.css"; // CSS モジュールをインポート

export const UnityApp: React.FC = () => {
  const { unityProvider, isLoaded, loadingProgression, sendMessage } = useUnityContext({
    loaderUrl: "/unity-build/Build/20250221_v2_2.loader.js",
    dataUrl: "/unity-build/Build/20250221_v2_2.data",
    frameworkUrl: "/unity-build/Build/20250221_v2_2.framework.js",
    codeUrl: "/unity-build/Build/20250221_v2_2.wasm",
  });

  const [unitySize, setUnitySize] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 768) {
        const newWidth = Math.min(window.innerWidth * 0.9, 800);
        setUnitySize({ width: newWidth, height: newWidth * 0.75 });
      } else {
        setUnitySize({ width: 800, height: 600 });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const sendToUnity = () => {
    if (isLoaded) {
      sendMessage("UnityWebGL", "OnButtonPressed", "ボタンが押されました");
    } else {
      console.warn("Unity がまだロードされていません");
    }
  };

  const sendToZoomInUnity = () => {
    if (isLoaded) {
      sendMessage("UnityWebGL", "OnZoomInBtnPressed", "ボタンが押されました");
    } else {
      console.warn("Unity がまだロードされていません");
    }
  };

  const sendToZoomOutUnity = () => {
    if (isLoaded) {
      sendMessage("UnityWebGL", "OnZoomOutBtnPressed", "ボタンが押されました");
    } else {
      console.warn("Unity がまだロードされていません");
    }
  };

  return (
    <div className={styles.unityContainer}>
      {!isLoaded && <p className={styles.loadingText}>Loading... ({Math.round(loadingProgression * 100)}%)</p>}
      <Unity
        unityProvider={unityProvider}
        style={{
          width: `${unitySize.width}px`,
          height: `${unitySize.height}px`,
        }}
        className={styles.unityCanvas}
      />
      <button onClick={sendToUnity} className={styles.button}>
        Unity に送信
      </button>
      <button onClick={sendToZoomInUnity} className={styles.button}>
        ZoomIn に送信
      </button>
      <button onClick={sendToZoomOutUnity} className={styles.button}>
        ZoomOut に送信
      </button>
    </div>
  );
};

// ここで default export を追加
export default UnityApp;