// dynamicを使用しクライアント処理にするため用のクッション用ファイル
// サーバーサイドレンダリング時にエラーが発生するのを防ぎ、クライアントサイドでのみUnity WebGLコンポーネントをロードする

"use client"; // クライアントコンポーネントにする

import React from "react";
import dynamic from "next/dynamic";

// `ssr: false` を使うためにラップ
// UnityApp コンポーネントを動的にインポートし、SSR を無効にする
const UnityApp = dynamic(() => import("../components/UnityApp").then((mod) => mod.default), { ssr: false });

const UnityWrapper = () => {
  // UnityApp コンポーネントをレンダリング
  return <UnityApp />;
};

export default UnityWrapper;
