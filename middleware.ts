import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {Routes, privateRoutes} from '@/app/config/routes';

export function middleware(request: NextRequest) {
  const jwt = request.cookies.get('jwt');

  if (!jwt && privateRoutes.includes(request.nextUrl.pathname as Routes)) {
    return NextResponse.redirect(new URL(Routes.Login, request.url));
  }

  return NextResponse.next();
}
