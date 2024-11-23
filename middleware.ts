import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import {Routes, privateRoutes} from '@/app/config/routes';
import {AUTH_COOKIE} from '@/app/config/constants';
import {apiBaseUrl} from '@/app/config/endpoints';

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: '/',
  httpOnly: false,
  secure: true,
  sameSite: false ,
};

export async function middleware(request: NextRequest) {
  const awaitedCookies = await cookies();
  const jwt = awaitedCookies.get(AUTH_COOKIE)?.value;
  console.log('jwt', jwt);

//   console.log('request', request.url.includes('login'));
  console.log('request', request);
//   console.log('NEXTREQUEST', request.nextUrl);
  if (request.nextUrl.pathname.match(/^\/login\/*/)) {
    const urlSearchParams = new URLSearchParams(request.nextUrl.search)
    const params = Object.fromEntries(urlSearchParams.entries());
    const provider = request.nextUrl.pathname.replace(/^\/login\//, '');
    try {
      const token = params.access_token;
      if (token) {
        const path = `/auth/${provider}/callback`;
        const url = `${apiBaseUrl}${path}?access_token=${token}`;
    
        const res = await fetch(url);
        const data = await res.json();
        console.log('data', data.jwt);

        const redirect = NextResponse.redirect(new URL(Routes.Home, request.url))
        redirect.cookies.set(AUTH_COOKIE, data.jwt, {
            ...config,
            domain: new URL(request.nextUrl.origin).hostname,
          });
          console.log('redirect', redirect);
        return redirect;
      }
    } catch (error) {
      console.log('Error connecting account', error);
    }
  }

  if (!jwt && privateRoutes.includes(request.nextUrl.pathname as Routes)) {
    return NextResponse.redirect(new URL(Routes.Login, request.url));
  }

  return NextResponse.next();
}
