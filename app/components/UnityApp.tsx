"use client"; // ファイルの最初に追加

import React from "react";
// src/types/global.d.ts
declare module "react-unity-webgl";
import { Unity, useUnityContext } from "react-unity-webgl";

export const UnityApp: React.FC = () => {
  const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
    loaderUrl: "../unity-build/Build/20250220_v2.loader.js",
    dataUrl: "/unity-build/Build/20250220_v2.data",
    frameworkUrl: "/unity-build/Build/20250220_v2.framework.js",
    codeUrl: "/unity-build/Build/20250220_v2.wasm",
  });

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {!isLoaded && (
        <div>
          <p>Loading... ({Math.round(loadingProgression * 100)}%)</p>
        </div>
      )}
      <Unity
        unityProvider={unityProvider}
        style={{ width: "800px", height: "600px" }}
      />
    </div>
  );
};
