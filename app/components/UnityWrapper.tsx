"use client"; // クライアントコンポーネントにする

import React from "react";
import dynamic from "next/dynamic";

// `ssr: false` を使うためにラップ
const UnityApp = dynamic(() => import("../components/UnityApp").then((mod) => mod.default), { ssr: false });

const UnityWrapper = () => {
  return <UnityApp />;
};

export default UnityWrapper;
