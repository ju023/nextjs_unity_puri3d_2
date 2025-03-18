// app/page.tsx
// import Image from "next/image";
// import Link from 'next/link';
import Topmain from "./components/toppage/TopApp";
import TopHeader from "./components/toppage/TopHeader";

export default function Home() {
  return (
    // 独自フォントの実装 font-cinecaption
    // <div className="bg-green-50 min-h-screen text-gray-800 font-cinecaption">
    <main>
      {/* ヘッダー */}
      <TopHeader/>
      {/* ヘッダーとpage.tsxの間に空白 */}
      {/*<div className="bg-green-50 min-h-[200px]"></div>*/}
      {/* トップpage.tsx */}
      <Topmain/>
    </main>
  );
}
