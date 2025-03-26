// app/layout.tsx

import './styles/globals.css'; // グローバルCSSをインポート
// import TopHeader from './components/toppage/TopHeader';
// import Topmain from './components/top/main';

export const metadata = {
    title: "PuriProject Topページ",
    description: "Next.jsのApp Routerでコンポーネント管理する",
  };

  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html>
        <body>
          {/* ヘッダー */}
          {/*<TopHeader />*/}
          {/* ヘッダーとpage.tsxの間に空白 */}
          {/* page.tsx */}
          {children}
          {/* フッター */}
          <footer></footer>
        </body>
      </html>
    );
  }