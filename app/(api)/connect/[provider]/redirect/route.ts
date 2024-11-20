import {NextResponse} from 'next/server';
import {cookies} from 'next/headers';

import {apiBaseUrl} from '@/app/config/endpoints';
import {Routes} from '@/app/config/routes';
import {AUTH_COOKIE} from '@/app/config/constants';

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: '/',
  httpOnly: false,
  secure: true,
  sameSite: 'none',
};

export const dynamic = 'force-dynamic';
export async function GET(
  request: Request,
  params: {params: {provider: string}},
) {
  try {
    const {searchParams} = new URL(request.url);
    const token = searchParams.get('access_token');
    if (!token) {
      throw new Error('Failed to authenticated by provider');
    }

    const parsedParams = await params.params;
    const path = `/auth/${parsedParams.provider}/callback`;
    const url = `${apiBaseUrl}${path}?access_token=${token}`;

    const res = await fetch(url);
    const data = await res.json();
    const awaitedCookie = await cookies();
    awaitedCookie.set(AUTH_COOKIE, data.jwt, {...config, domain: request.url});
    const redirectionUrl = new URL(Routes.Home, request.url);
    const response =  NextResponse.redirect(redirectionUrl);
    response.cookies.set(AUTH_COOKIE, data.jwt, config);
    return response;
  } catch (error) {
    console.log('Error connecting account', error);
    const redirectionUrl = new URL(Routes.Login, request.url);
    return NextResponse.redirect(redirectionUrl);
  }
}
