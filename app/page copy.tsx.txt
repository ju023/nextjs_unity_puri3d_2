import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (
    // 独自フォントの実装 font-cinecaption
    <div className="bg-green-50 min-h-screen text-gray-800 font-cinecaption">
      {/* ヘッダー */}
      <header className="fixed justify-center top-0 w-full flex flex-col md:flex-row  items-center p-4 bg-green-100 shadow">
        <Link href="/unity" className="text-gray-600 hover:text-black">
          <div className="flex items-center text-lg font-bold bg-emerald-200 inline-block px-4 py-2 rounded shadow">
            <Image src="/assets/images/putidlogo.png" alt="Puri" width={100} height={200} className="rounded-lg " />
            <span className="ml-2">プレイ</span>
          </div>
        </Link>
        <nav className="space-x-4 text-2xl ml-10">
          <a href="#home" className="text-gray-600 hover:text-black">ホーム</a>
          <a href="#story" className="text-gray-600 hover:text-black">ストーリー</a>
          <a href="#howtoplay" className="text-gray-600 hover:text-black">遊び方</a>
        </nav>
      </header>

      {/* メインコンテンツ */}
      <main id="home" className="p-8">
        {/* タイトル＆キャラ画像 */}
        {/* 文字 + logo と puri3dmodel 横並び配置 */}
        <div className="mt-40 mb-12 flex flex-col md:flex-row items-center gap-8 justify-center">
          {/* 文字 と logo 縦並び配置 */}
          <div className="flex flex-col md:flex-col items-center gap-0">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold ">Puriは君の大切な <span className="text-red-500">友達</span></h2>
              <h2 className="text-2xl font-bold">大切な <span className="text-red-500">家族</span></h2>
              <h2 className="mt-2 text-2xl font-bold">いつも傍にいる</h2>
              <h2 className="text-2xl font-bold">大切な <span className="text-red-500">モノ</span> をあなたにも</h2>
            </div>
            <Image src="/assets/images/putidlogo.png" alt="Puri" width={500} height={200} className="rounded-lg" />
          </div>
          {/* 文字 と logo 縦並び配置 end */}
          <Image src="/assets/images/test1.png" alt="Puri" width={400} height={200} className="rounded-lg" />
        </div>
        {/* 文字 + logo と puri3dmodel 横並び配置 end */}

        {/* ストーリー */}
        {/* <section className="mt-12 bg-gray-100 p-6 rounded-lg shadow"> */}
          {/* <h3 className="text-lg font-bold">ストーリー</h3> */}
        <section id="story" className="mt-80">
          <div className="border-t-4 border-gray-200 shadow"></div>
          <h3 className="mt-12 text-lg font-bold bg-gray-200 inline-block px-4 py-2 rounded shadow">ストーリー</h3>  
          <div className="flex flex-col md:flex-col items-center gap-0">
            {/* 画像 + 文字 横並び配置 */}
            <div className="mt-4 flex flex-col md:flex-row items-center gap-6 justify-center"> 
                <div className="p-4 rounded-lg">
                  <Image src="/assets/images/test4.png" alt="Story" width={500} height={400} className="rounded shadow" />
                </div>
                <div className="mt-12 bg-gray-100 p-9 rounded-lg shadow">
                  <p className="text-gray-700 text-xl">
                    すこし休憩がしたくなった。<br />
                    なにかをぼーっと眺めたい。<br />
                    そんな <span className="text-red-500 font-bold">癒し</span> が欲しい...
                  </p>
                </div>
            </div>
            <div className="mt-6 bg-gray-100 p-9 rounded-lg shadow">
              <p className="text-gray-700 text-2xl">
                puriは自由気ままに動きます。<br />
                こちらからアクションをすることは特にありません。<br />
                <br />
                puriは自由行動、ダンス、睡眠など自発的に行うため <br />
                生きている１つの<span className="text-red-500 font-bold">生き物</span> として接し見守ってくれると <br />
                いつかpuriの方から心を開いてくれます。
              </p>
            </div>
          </div>
        </section>

        {/* 遊び方 */}
        <section id="howtoplay" className="mt-80">
          <div className="border-t-4 border-gray-200 shadow"></div>
          <h3 className="mt-12 text-lg font-bold bg-gray-200 inline-block px-4 py-2 rounded shadow">遊び方</h3>
          <div className="mt-4 flex flex-col md:flex-row items-center gap-6 justify-center">
            <div className="p-4 rounded-lg">
              <Image src="/assets/images/test5.png" alt="Game" width={700} height={500} className="rounded shadow" />
            </div>
            <div className="mt-12 bg-gray-100 p-6 rounded-lg shadow">
              <ul className="text-sm text-gray-700 text-xl">
                <li>● PCの場合</li>
                <br />
                <li>・視点移動</li>
                <li>右クリック+マウス移動</li>
                <br />
                <li>・ズーム</li>
                <li>マウスホイール上下</li>
                <br />
                <li>● スマホの場合</li>
                <li>・視点移動</li>
                <li>２本指でスワイプ</li>
                <li>(１本指だとクリック)</li>
                <br />
                <li>・ズームイン</li>
                <li>ZoomInを送信の押下</li>
                <br />
                <li>・ズームアウト</li>
                <li>ZoomOutを送信の押下</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
