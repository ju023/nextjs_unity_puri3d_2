// app/components/toppage/TopHeader.tsx

// import Image from "next/image";
import Link from 'next/link';

export default function MenuHeader() {
  return (
    // 独自フォントの実装 font-cinecaption
    <div className="bg-green-50 text-gray-800 font-cinecaption">
        {/* メニューヘッダーの要素 */}
        <div className="flex items-center bg-green-100">
          {/* Unityゲームプレイのボタン */}
          <Link href="/unity" className="text-gray-600 focus:outline-2">
              <div className="flex items-center text-lg font-bold bg-emerald-200 inline-block px-4 py-2 rounded shadow hover:text-black 
                border border-transparent transition-colors duration-200 hover:border-black">
              {/*<Image src="/assets/images/putidlogo.png" alt="Puri" width={100} height={200} className="rounded-lg " />*/}
                <span className="ml-2">ゲームプレイ</span>
              </div>
          </Link>
          {/* 他ヘッダーボタン */}
          <nav className="space-x-4 text-2xl ml-10">
              <a href="#home" className="rounded-lg text-gray-600 hover:text-black border border-transparent transition-colors duration-200 hover:border-black">ホーム</a>
              <a href="#story" className="rounded-lg text-gray-600 hover:text-black border border-transparent transition-colors duration-200 hover:border-black">ストーリー</a>
              <a href="#howtoplay" className="rounded-lg text-gray-600 hover:text-black border border-transparent transition-colors duration-200 hover:border-black">遊び方</a>
          </nav>
        </div>
    </div>
  );
}