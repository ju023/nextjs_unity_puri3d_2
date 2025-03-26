// app/middleware/index.ts
/*
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// import { adminisAuthenticated } from '../lib/admin/admin-auth'; // パスの調整が必要

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // /firebase 以下のパスにアクセスする際に認証チェックを行う
  if (path.startsWith('/firebase') && path !== '/admin') {
    if (!adminisAuthenticated()) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

// どのパスに対してmiddlewareを適用するか設定
export const config = {
  matcher: ['/firebase/:path*'],
};
*/