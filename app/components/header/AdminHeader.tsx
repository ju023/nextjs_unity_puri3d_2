// app/components/adminpage/AdminHeader.tsx

"use client";
import Image from "next/image";
import { useEffect, useState } from 'react';
import { auth } from "../../lib/firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { isAuthenticatedClient } from "../../lib/admin/admin-auth-client"
// import { logoutClient } from "../../lib/admin/admin-auth-client"; // logoutClient をインポート
import { logoutFromFirebase } from "@/app/lib/firebase/firebase-functions";
import Link from 'next/link';

export default function AdminHeader() {

  const [showLoginButton, setShowLoginButton] = useState(false);
  const [showUserElements, setShowUserElements] = useState(false);
  const [showAdminElements, setShowAdminElements] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // isAuthenticated の状態を useState で管理
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false); // ライトボックスの表示状態を管理する state

  //
  // 管理者認証、ログイン等の表示条件処理
  //
  useEffect(() => {
      const checkAuth = async () => {
        const authResult = await isAuthenticatedClient();
        setIsAuthenticated(authResult); // isAuthenticated の値を更新
        console.log('isAuthenticated',isAuthenticated);
      };

      onAuthStateChanged(auth, async (user) => {

        await checkAuth(); // onAuthStateChanged 内で checkAuth を呼び出す

        if (isAuthenticated) {
          setShowAdminElements(true);
          if (user) {
            setShowUserElements(true);
            setShowLoginButton(false);
          } else {
            setShowUserElements(false);
          }
        } else {
          setShowAdminElements(false);
          if (user) {
            setShowUserElements(true);
            setShowLoginButton(false);
          } else {
            setShowLoginButton(true);
            setShowUserElements(false);
          }
        }
      });


  }, [isAuthenticated]);

  const handleLogin = () => {
    window.location.assign('/login');
  };

  const handleLogout = async () => {
    await logoutFromFirebase();
    alert("ログアウトしました");
    window.location.reload(); // ページを再読み込み
  };

  const handleLogoutConfirmation = () => {
      setShowLogoutConfirmation(true); // ライトボックスを表示
  };

  const handleConfirmLogout = () => {
      handleLogout(); // ログアウト処理を実行
      setShowLogoutConfirmation(false); // ライトボックスを非表示
  };

  const handleCancelLogout = () => {
      setShowLogoutConfirmation(false); // ライトボックスを非表示
  };

  return (
    // 独自フォントの実装 font-cinecaption
    <div className="bg-green-50 text-gray-800 font-cinecaption">
      {/* ヘッダー */}
      <div className="flex flex-col md:flex-row py-2 px-2 bg-green-100 items-center justify-between">
        {/* 他ヘッダーボタン */}
        <nav className="space-x-2 text-2xl flex items-center">
          {/* 管理者ログインicon */}
          {showAdminElements && (
            <div className="rounded-lg flex flex-col items-center">
              <a
                className="text-gray-600 text-[14px]"
                id="admin_txt">
                管理者
              </a>
              <Image
                src="/assets/images/hagyruma2_800.png"
                alt="Haguruma_img"
                width={40}
                height={40}
                className="rounded-lg" />
            </div>
          )}
          {/* ユーザーログアウトicon */}
          {showUserElements && (
            <div
              id="Logout"
              className="
                cursor-pointer rounded-lg flex flex-col items-center hover:text-black
                border border-transparent transition-colors duration-200 hover:border-black"
              onClick={handleLogoutConfirmation}>
              <a
                className="text-gray-600 text-[6px] md:text-[12px]"
                id="logout_txt">
                ログアウト
              </a>
              <Image
                src="/assets/images/logout_icon_800.png"
                alt="Logout_img"
                width={40}
                height={30}
                className="" />
            </div>
          )}
          {/* ユーザーログインicon */}
          {showUserElements && (
            <div className="rounded-lg flex flex-col items-center">
              <a
                className="text-gray-600 text-[8px] md:text-[12px]"
                id="user_txt">
                ユーザー
              </a>
              <Image
                src="/assets/images/user_g1_800.png"
                alt="User_img"
                width={40}
                height={40}
                className="" />
            </div>
          )}
          {/* ログインボタン (PC画面) */}
          {showLoginButton && (
            <div
              className="
                hidden md:flex items-center text-lg font-bold bg-emerald-200 inline-block px-4 rounded shadow hover:text-black
                border border-transparent transition-colors duration-200 hover:border-black"
              id="login_btn">
              <a
                href="/login"
                className="text-gray-600 hover:text-black">
                ログイン
              </a>
            </div>
          )}
          {/* ログインボタン (スマホ画面) */}
          {showLoginButton && (
            <div
              id="Login"
              className="
                md:hidden cursor-pointer rounded-lg flex flex-col items-center hover:text-black
                border border-transparent transition-colors duration-200 hover:border-black"
              onClick={handleLogin}>
              <a
                className="text-gray-600 text-[8px] md:text-[12px]"
                id="login_txt">
                ログイン
              </a>
              <Image
                src="/assets/images/login_icon_800.png"
                alt="Login_img"
                width={30}
                height={20}
                className="" />
            </div>
          )}
        </nav>
      </div>
      {/* ライトボックス */}
      {showLogoutConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center
                                items-center">
          <div className="bg-white p-8 rounded-lg">
            <p className="text-lg mb-4">ログアウト<br/><br/>本当にしますか？</p>
            <div className="flex justify-around">
              {/* ライトボックスのYesボタン */}
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                onClick={handleConfirmLogout}>
                Yes
              </button>
              {/* ライトボックスのNoボタン */}
              <button
                className="bg-gray-300 px-4 py-2 rounded-lg"
                onClick={handleCancelLogout}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}