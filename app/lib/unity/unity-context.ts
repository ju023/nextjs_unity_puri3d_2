// app/lib/unity-context.ts
import { useUnityContext } from "react-unity-webgl";
// import React from 'react';


// UnityContext 型を使用してコンテキストを作成
// export const UnityContextApi = React.createContext<UnityContext | undefined>(undefined);

// useUnityContext を定義する専用のファイル、Unity WebGL ビルド設定を事前定義
export const useCreateUnityContext = () => {
  return useUnityContext({
    loaderUrl: "/unity-build/Build/20250420_v2.1_b2.loader.js",
    dataUrl: "/unity-build/Build/20250420_v2.1_b2.data",
    frameworkUrl: "/unity-build/Build/20250420_v2.1_b2.framework.js",
    codeUrl: "/unity-build/Build/20250420_v2.1_b2.wasm",
  });
};