// app/page.tsx
// import Image from "next/image";
// import Link from 'next/link';
import AdminLoginApp from "../components/adminpage/AdminApp";
// import TopHeader from "../components/header/TopPageHeader";
import AdminPageHeader from "../components/header/AdminPageHeader";


export default function AdminHome() {
  return (
    // 独自フォントの実装 font-cinecaption
    // <div className="bg-green-50 min-h-screen text-gray-800 font-cinecaption">
    <main>
      {/* ヘッダー */}
      <AdminPageHeader/>
      {/* ヘッダーとpage.tsxの間に空白 */}
      {/*<div className="bg-green-50 min-h-[200px]"></div>*/}
      {/* トップpage.tsx */}
      <AdminLoginApp/>
    </main>
  );
}
