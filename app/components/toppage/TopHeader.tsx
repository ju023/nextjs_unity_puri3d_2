// app/components/toppage/TopHeader.tsx

// import Image from "next/image";
// import Link from 'next/link';
import AdminHeader from "../adminpage/AdminHeader";
import MenuHeader from "../menupage/ManuHeader";
import IconHeader from "../menupage/IconHeader";

export default function TopHeader() {
  return (
    // 独自フォントの実装 font-cinecaption
    <div className="bg-green-50 text-gray-800 font-cinecaption">
        {/* ヘッダー */}
        <header className="fixed justify-center top-0 w-full flex flex-col md:flex-row  items-center p-0 bg-green-100 shadow">
          <div className="flex w-full justify-between">
            {/* メニューヘッダーの要素 */}
            {/*<div className="flex-1 border-r-4">*/}
            <div className="items-center flex px-4">
              <IconHeader />
            </div>
            <div className="items-center">
              <MenuHeader />
            </div>
            {/*</div>*/}
            {/* 管理認証、ログイン認証の要素 */}
            <div className="items-center flex border-l-4">
              <AdminHeader/>
            </div>
          </div>
        </header>
    </div>
  );
}