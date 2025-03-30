// app/unity/layout.tsx

import '../styles/globals.css'; // グローバルCSSをインポート
// import { UnityHeader } from '../components/header/UnityHeader';
// import Topmain from './components/top/main';

export const metadata = {
    title: "PuriProject Unityページ",
    description: "Next.jsのApp Routerでコンポーネント管理する",
  };

  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      //<html lang="en">
        //<body>
        <div>
          {/* ヘッダー */}
          {/*<UnityHeader />*/}
          {/* page.tsx */}
          {children}
          {/* フッター */}
          <footer></footer>
        </div>
        //</body>
      //</html>
    );
  }