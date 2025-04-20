// app/components/toppage/TopHeader.tsx

import Link from 'next/link';

export default function MenuHeader() {
  return (
    <div className="bg-green-100 text-gray-800 font-cinecaption">
      <div className="flex flex-col items-center justify-between p-1 md:flex-row md:items-center">
        {/* 上部：プレイボタン */}
        <Link
          href="/unity"
          className="text-gray-600 focus:outline-2 mb-2 md:mb-0">
          <div
            className="
            flex items-center text-base md:text-lg font-bold bg-emerald-200 inline-block px-3 py-1
            md:px-4 md:py-2 rounded shadow hover:text-black
            border border-transparent transition-colors duration-200 hover:border-black">
            <span
              className="ml-1 md:ml-2">
              プレイ
            </span>
          </div>
        </Link>

        {/* 下部：ホーム、物語、遊び方 */}
        <nav className="flex space-x-4 md:space-x-2 text-sm md:text-xl">
          <Link
            href="#home"
            className="
              rounded-lg text-gray-600 hover:text-black
              border border-transparent transition-colors duration-200 hover:border-black">
            ホーム
          </Link>
          <Link
            href="#story"
            className="
              rounded-lg text-gray-600 hover:text-black
              border border-transparent transition-colors duration-200 hover:border-black">
            物語
          </Link>
          <Link
            href="#howtoplay"
            className="
              rounded-lg text-gray-600 hover:text-black
              border border-transparent transition-colors duration-200 hover:border-black">
            遊び方
          </Link>
        </nav>
      </div>
    </div>
  );
}