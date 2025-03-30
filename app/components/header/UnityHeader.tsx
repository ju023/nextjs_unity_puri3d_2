// app/components/header/UnityHeader.tsx
// import Image from "next/image";
// import Link from 'next/link';

"use client";
// import { useRouter } from "next/navigation";
// import {  // Message,
//              SaveData,  } from "@/app/lib/firebase/firebase-interface";
import { UnityControllerProps } from "@/app/lib/unity/unity-interface";
import { useSavedataFlag } from "../unitypage/UnityFlagManager";
// import { useCreateUnityContext } from "@/app/lib/unity/unity-context";
// import { SavedataFlagProvider } from "../unitypage/UnityFlagManager";
// import {  }


export const UnityHeader: React.FC = () => {
  const { unityContext } = useSavedataFlag(); // コンテキストから unityContext を取得

  // const unityContext = useCreateUnityContext(); // 外部の関数を呼び出す

  // const router = useRouter();
  // ゲーム終了の処理
  const exitGame = () => {
    // 確認ダイアログを表示
    if (true/*window.confirm("本当にゲームを終了しますか？")*/) {

      // ゲーム終了：0_ゲーム終了しセーブデータをfirebaseへ保存の処理開始
      sendExitGameDataToUnity("exitgame_data_pls");
      // router.push("/");
      /*
      // 特定のページに移動
      window.location.assign('/');

      // ページ読み込み完了後に再読み込み
      window.onload = function() {
        window.location.reload();
      };
      */
    }
  };

  // ゲーム終了：1_NextjsからUnityへゲーム終了時のセーブデータ取得のリクエスト
  
  const sendExitGameDataToUnity = async (messages_exitgamedata: string) => {
    if (unityContext && unityContext.isLoaded && unityContext.sendMessage) {
    // const { sendMessage } = unityContext;
    // const sendDataToUnity = async(messages_savedata: SaveData) => {
      if (messages_exitgamedata) {
        console.warn("NextjsからUnityへ送信データ: = " , messages_exitgamedata);
        unityContext.sendMessage("UnityWebGL", "OnButtonPressed", "exitgame_data_pls");
      } else {
        console.warn("送信データがありません");
      }
    } else {
      console.warn("Unity がまだロードされていません");
    }
  };
  

  return (
    // 独自フォントの実装 font-cinecaption
    <div className="bg-green-50 text-gray-800 font-cinecaption">
        {/* ヘッダー */}
        {/*<header className="fixed justify-center top-0 flex flex-col md:flex-row  items-center p-2 bg-green-100 shadow">*/}
        {/* Unityゲーム終了のボタン */}
        {/*<UnityExitBtn/>*/}
        {/*<Link href="/unity" className="text-gray-600 hover:text-black">
            <div className="flex items-center text-lg font-bold bg-emerald-200 inline-block px-4 py-4 rounded shadow">
              <span className="ml-2">プレイ</span>
            </div>
        </Link>*/}
        {/* 他ヘッダーボタン */}
        {/* ゲーム終了ボタンを追加 */}
        <button
          onClick={exitGame}
          className="text-gray-600 hover:text-black ml-4"
        >
          <div className="flex items-center text-lg font-bold bg-red-200 inline-block px-4 py-1 rounded shadow hover:text-black border border-transparent transition-colors duration-200 hover:border-black">
            <span className="ml-2">ゲーム終了</span>
          </div>
        </button>
        {/*</header>*/}
    </div>
  );
};

/*
export const UnityApp: React.FC = () => {
  return (
    <SavedataFlagProvider>
      <UnityHeader />
    </SavedataFlagProvider>
  );
};
*/

// export default function UnityHeader() {
//   return (
//     // 独自フォントの実装 font-cinecaption
//     <div className="bg-green-50 text-gray-800 font-cinecaption">
//         {/* ヘッダー */}
//         <header className="fixed justify-center top-0 w-full flex flex-col md:flex-row  items-center p-4 bg-green-100 shadow">
//         {/* Unityゲームプレイのボタン */}
//         {/*<UnityExitBtn/>*/}
//         <Link href="/unity" className="text-gray-600 hover:text-black">
//             <div className="flex items-center text-lg font-bold bg-emerald-200 inline-block px-4 py-2 rounded shadow">
//               <Image src="/assets/images/putidlogo.png" alt="Puri" width={100} height={200} className="rounded-lg " />
//               <span className="ml-2">プレイ</span>
//             </div>
//         </Link>
//         {/* 他ヘッダーボタン */}
//         <nav className="space-x-4 text-2xl ml-10">
//             <a href="#home" className="text-gray-600 hover:text-black">ホーム</a>
//             <a href="#story" className="text-gray-600 hover:text-black">ストーリー</a>
//             <a href="#howtoplay" className="text-gray-600 hover:text-black">遊び方</a>
//         </nav>
//         </header>
//     </div>
//   );
// }