import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {Routes, privateRoutes} from '@/app/config/routes';

export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get('next-auth.session-token');

  if (!sessionToken && privateRoutes.includes(request.nextUrl.pathname as Routes)) {
    return NextResponse.redirect(new URL(Routes.Home, request.url));
  }

  return NextResponse.next();
}
