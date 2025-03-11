import React from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/UnityApp.module.css";

// ゲーム終了ボタンコンポーネント
export const UnityExitBtn: React.FC = () => {
  const router = useRouter();

  // ゲーム終了の処理
  const exitGame = () => {
    // 確認ダイアログを表示
    if (window.confirm("本当にゲームを終了しますか？")) {
      router.push("/");
    }
  };

  return (
    <div className="mb-2 font-cinecaption">
      <button onClick={exitGame} className={styles.button}>
        ゲームを終了する
      </button>
    </div>
  );
};

export default UnityExitBtn;
