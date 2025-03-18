// app/components/adminpage/AdminHeader.tsx

"use client";
import Image from "next/image";
import { useEffect, useState } from 'react';
import { auth } from "../../lib/firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { isAuthenticatedClient } from "../../lib/admin/admin-auth-client"
// import Link from 'next/link';

export default function AdminHeader() {

    const [showLoginButton, setShowLoginButton] = useState(false);
    const [showUserElements, setShowUserElements] = useState(false);
    const [showAdminElements, setShowAdminElements] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false); // isAuthenticated の状態を useState で管理

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

    return (
        // 独自フォントの実装 font-cinecaption
        <div className="bg-green-50 text-gray-800 font-cinecaption">
            {/* ヘッダー */}
            <div className="flex flex-col md:flex-row py-2 px-8 bg-green-100">
                {/* Unityゲームプレイのボタン */}

                {/* 他ヘッダーボタン */}
                <div className="grid">
                    
                    <div className="flex">
                    {showAdminElements && (
                    <a className="text-gray-600 text-[14px]" id="admin_txt">管理者</a>
                    )}
                    {showAdminElements && showUserElements && (
                    <a className="text-gray-600 text-[14px]" id="colon_txt"> : </a>
                    )}
                    {showUserElements && (
                    <a className="text-gray-600 text-[14px]" id="user_txt">ユーザー</a>
                    )}
                    </div>
                    <nav className="space-x-2 text-2xl flex">
                        {/* 管理者ログインicon */}
                        {showAdminElements && (
                            <Image src="/assets/images/hagyruma2_800.png" alt="Haguruma" width={40} height={40} className="rounded-lg" />
                        )}
                        {/* ユーザーログインicon */}
                        {showUserElements && (
                            <Image src="/assets/images/user_g1_800.png" alt="User" width={40} height={40} className="rounded-lg " />
                        )}
                        {showLoginButton && (
                        <div className="flex items-center text-lg font-bold bg-emerald-200 inline-block px-4 rounded shadow hover:text-black border border-transparent transition-colors duration-200 hover:border-black" id="login_btn">
                            <a href="#howtoplay" className="text-gray-600 hover:text-black">ログイン</a>
                        </div>
                        )}
                    </nav>
                </div>
            </div>
        </div>
    );
}