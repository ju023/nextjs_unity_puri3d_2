// app/components/toppage/TopHeader.tsx

// import Image from "next/image";
// import Link from 'next/link';
import AdminHeader from "./AdminHeader";
// import MenuHeader from "./ManuHeader";
import IconHeader from "./IconHeader";

export default function AdminPageHeader() {
  return (
    // 独自フォントの実装 font-cinecaption
    <div className="bg-green-50 text-gray-800 font-cinecaption">
        {/* ヘッダー */}
        <header className="fixed justify-center top-0 w-full flex flex-col md:flex-row  items-center p-0 bg-green-100 shadow">
          <div className="flex w-full justify-between">
            {/* メニューヘッダーの要素 */}
            {/*<div className="flex-1 border-r-4">*/}
            <div className="items-center flex px-2">
              <IconHeader />
            </div>

            {/*</div>*/}
            {/* 管理認証、ログイン認証の要素 */}
            {/* <div className="items-center flex border-l-4">
              <AdminHeader/>
            </div> */}
          </div>
        </header>
    </div>
  );
}