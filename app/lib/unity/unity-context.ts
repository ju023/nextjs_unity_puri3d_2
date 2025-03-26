// app/lib/unity-context.ts
import { useUnityContext } from "react-unity-webgl";

// useUnityContext を定義する専用のファイル、Unity WebGL ビルド設定を事前定義
export const useCreateUnityContext = () => {
  return useUnityContext({
    loaderUrl: "/unity-build/Build/20250326_v2_b6.loader.js",
    dataUrl: "/unity-build/Build/20250326_v2_b6.data",
    frameworkUrl: "/unity-build/Build/20250326_v2_b6.framework.js",
    codeUrl: "/unity-build/Build/20250326_v2_b6.wasm",
  });
};