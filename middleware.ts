import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import {Routes, privateRoutes} from '@/app/config/routes';
import {AUTH_COOKIE} from '@/app/config/constants';


export async function middleware(request: NextRequest) {
  const awaitedCookies = await cookies();
  const jwt = awaitedCookies.get(AUTH_COOKIE)?.value;

  if (!jwt && privateRoutes.includes(request.nextUrl.pathname as Routes)) {
    return NextResponse.redirect(new URL(Routes.Login, request.url));
  }

  return NextResponse.next();
}
