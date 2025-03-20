// app/login/page.tsx
// import Topmain from "../components/toppage/TopApp";
import AdminPageHeader from "../components/header/AdminPageHeader";
// import FirebaseTestPage from "../components/firebasepage/FirebaseApp";
import LogInPage from "../components/loginpage/LogInApp";

export default function TopHome() {
  return (
    // 独自フォントの実装 font-cinecaption
    // <div className="bg-green-50 min-h-screen text-gray-800 font-cinecaption">
    <main>
      {/* ヘッダー */}
      <AdminPageHeader/>
      {/* トップpage.tsx */}
      <LogInPage/>
    </main>
  );
}