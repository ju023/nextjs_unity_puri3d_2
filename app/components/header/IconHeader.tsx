// app/components/toppage/IconHeader.tsx

import Image from "next/image";
import Link from 'next/link';

export default function IconHeader() {
  return (
    // 独自フォントの実装 font-cinecaption
    <div className="bg-green-100 text-gray-800 font-cinecaption">
      {/* Puriのいる日常アイコンヘッダーの要素 */}
      <Link
        href="/"
        className="text-gray-600 focus:outline-2">
        <Image
          src="/assets/images/putidlogo.png"
          alt="Puri"
          width={200} // デフォルトの幅を小さく
          height={100} // デフォルトの高さを小さく (アスペクト比維持)
          className="
            rounded-lg border border-transparent transition-colors duration-200 hover:border-black
            w-[80px] md:w-[150px]" // PC以上で元のサイズに
        />
      </Link>
    </div>
  );
}