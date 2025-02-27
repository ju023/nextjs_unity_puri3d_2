import React from "react";
// import { UnityApp } from "../components/UnityApp";
// import { UnityApp } from "../components/UnityApp";
import UnityWrapper from "../components/UnityWrapper"; // `UnityWrapper.tsx` をインポート


export default function Home() {
  return (
    <main style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <UnityWrapper />
    </main>
  );
}
