"use client"; // Next.js の Client コンポーネント

import React, { useState, useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

// react-unity-webgl の型宣言
declare module "react-unity-webgl";

export const UnityApp: React.FC = () => {
  const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
    loaderUrl: "../unity-build/Build/20250220_v2.loader.js",
    dataUrl: "/unity-build/Build/20250220_v2.data",
    frameworkUrl: "/unity-build/Build/20250220_v2.framework.js",
    codeUrl: "/unity-build/Build/20250220_v2.wasm",
  });

  // 画面サイズを状態として管理
  const [unitySize, setUnitySize] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 768) {
        // スマホサイズ
        const newWidth = Math.min(window.innerWidth * 0.9, 800); // 最大 800px
        setUnitySize({ width: newWidth, height: newWidth * 0.75 }); // 4:3 の比率を維持
      } else {
        // PCサイズ
        setUnitySize({ width: 800, height: 600 });
      }
    };

    updateSize(); // 初回実行
    window.addEventListener("resize", updateSize); // 画面サイズ変更時に実行

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100vh" }}>
      {!isLoaded && (
        <div>
          <p>Loading... ({Math.round(loadingProgression * 100)}%)</p>
        </div>
      )}
      <Unity
        unityProvider={unityProvider}
        style={{
          width: `${unitySize.width}px`,
          height: `${unitySize.height}px`,
          maxWidth: "100%",
          maxHeight: "100%",
        }}
      />
    </div>
  );
};
