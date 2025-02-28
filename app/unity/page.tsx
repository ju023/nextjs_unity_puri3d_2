import React from "react";
import UnityWrapper from "../components/UnityWrapper"; // `UnityWrapper.tsx` をインポート


export default function Home() {
  return (
    <main className="bg-green-50 width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column'">
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <UnityWrapper />
      </div>
    </main>
  );
}
