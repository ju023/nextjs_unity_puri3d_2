// app/components/toppage/TopHeader.tsx

import Image from "next/image";
import Link from 'next/link';

export default function MenuHeader() {
  return (
    // 独自フォントの実装 font-cinecaption
    <div className="bg-green-100 text-gray-800 font-cinecaption">
        {/* Puriのいる日常アイコンヘッダーの要素 */}
        <Link href="/" className="text-gray-600 focus:outline-2">
            <Image src="/assets/images/putidlogo.png" alt="Puri" width={150} height={200} className="rounded-lg border border-transparent transition-colors duration-200 hover:border-black" />
        </Link>
    </div>
  );
}