import React, { useEffect, useState } from "react";
import { Unity } from "react-unity-webgl";
import styles from "../../styles/UnityApp.module.css";
import { useCreateUnityContext } from "../../lib/unity/unity-context";

// UnityDisplay コンポーネントの Props の型定義
interface UnityDisplayProps {
  unityContext: ReturnType<typeof useCreateUnityContext>;
}

// UnityWebGlを表示するための処理
export const UnityDisplay: React.FC<UnityDisplayProps> = ({ unityContext }) => {
  // Unity コンテキストから必要な値を取り出す
  const { unityProvider, isLoaded, loadingProgression } = unityContext;
  // Unity の表示サイズを管理するステート
  const [unitySize, setUnitySize] = useState({ width: 800, height: 600 });

  // コンポーネントのマウント時とウィンドウサイズ変更時に実行
  useEffect(() => {
    // Unity の表示サイズを更新する関数
    const updateSize = () => {
      // ウィンドウ幅が 768px 未満の場合 (モバイルサイズ)
      if (window.innerWidth < 768) {
        // 幅をウィンドウ幅の 90% と 800px の小さい方に設定
        const newWidth = Math.min(window.innerWidth * 0.9, 800);
        // 高さを幅の 75% に設定
        setUnitySize({ width: newWidth, height: newWidth * 0.75 });
      // デスクトップサイズの場合はデフォルトのサイズ (800x600) を設定
      } else {
        setUnitySize({ width: 800, height: 600 });
      }
    };

    // 初期サイズを設定
    updateSize();
    // ウィンドウサイズ変更時のイベントリスナーを追加
    window.addEventListener("resize", updateSize);
    // コンポーネントのアンマウント時にイベントリスナーを削除
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className={styles.unityContainer}>
      {/* Unity のロードが完了していない場合はローディングメッセージを表示 */}
      {!isLoaded && (
        <p className={styles.loadingText}>Loading... ({Math.round(loadingProgression * 100)}%)</p>
      )}
      <Unity
        unityProvider={unityProvider}
        style={{
          width: `${unitySize.width}px`,
          height: `${unitySize.height}px`,
        }}
        className={styles.unityCanvas}
      />
    </div>
  );
};

export default UnityDisplay;
