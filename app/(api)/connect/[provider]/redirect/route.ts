import {NextResponse} from 'next/server';
import {cookies} from 'next/headers';

import {apiBaseUrl} from '@/app/config/endpoints';
import {Routes} from '@/app/config/routes';
import {AUTH_COOKIE} from '@/app/config/constants';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string;
const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: '/',
  domain: baseUrl,
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
};

export const dynamic = 'force-dynamic';
export async function GET(
  request: Request,
  params: {params: {provider: string}},
) {
  try {
    const {searchParams} = new URL(request.url);
    console.log('request.url', request.url);
    console.log('baseUrl', baseUrl);
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
    awaitedCookie.set(AUTH_COOKIE, data.jwt, config);
    console.log('data.jwt', data.jwt);
    const redirectionUrl = new URL(Routes.Home, baseUrl);
    console.log('Redirect: Cookies set, redirecting to ', redirectionUrl);
    return NextResponse.redirect(redirectionUrl);
  } catch (error) {
    console.log('Error connecting account', error);
    const redirectionUrl = new URL(Routes.Login, baseUrl);
    console.log('Error, redirecting');
    return NextResponse.redirect(redirectionUrl);
  }
}
