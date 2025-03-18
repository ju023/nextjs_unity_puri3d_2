import React from "react";
import UnityWrapper from "../components/unitypage/UnityWrapper"; // `UnityWrapper.tsx` をインポート
import UnityHeader from "../components/unitypage/UnityHeader";


export default function Home() {
  return (

    <main>
      {/* ヘッダー */}
      <UnityHeader/>
      {/* ヘッダーとpage.tsxの間に空白 */}
      {/*<div className="bg-green-50 min-h-[50px]"></div>*/}
      {/* Unityゲームの内容 */}
      <div className="bg-green-50 width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column'">
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <UnityWrapper />
        </div>
      </div>
    </main>
  );
}
