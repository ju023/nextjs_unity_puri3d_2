// app/firebase/page.tsx
// import Topmain from "../components/toppage/TopApp";
import AdminPageHeader from "../../components/header/AdminPageHeader";
// import FirebaseTestPage from "../../components/firebase/FirebaseApp";
import AuthPage from "@/app/components/authentication/AuthenticationApp";

export default function TopHome() {
  return (
    // 独自フォントの実装 font-cinecaption
    // <div className="bg-green-50 min-h-screen text-gray-800 font-cinecaption">
    <main>
      {/* ヘッダー */}
      <AdminPageHeader/>
      {/* トップpage.tsx */}
      <AuthPage/>
    </main>
  );
}