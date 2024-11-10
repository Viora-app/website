import {NextResponse} from 'next/server';
import {cookies} from 'next/headers';

import {getApiUrl} from '@/app/utils/api';
import { Routes } from '@/app/config/routes';

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: '/',
  domain: process.env.HOST ?? 'localhost',
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
    const token = searchParams.get('access_token');
    if (!token) {
      throw new Error('Failed to authenticated by provider');
    }

    const parsedParams = await params.params;
    const backendUrl = getApiUrl();
    const path = `/api/auth/${parsedParams.provider}/callback`;
    const url = `${backendUrl}${path}?access_token=${token}`

    const res = await fetch(url);
    const data = await res.json();
    const awaitedCookie = await cookies();
    awaitedCookie.set('jwt', data.jwt, config);
    return NextResponse.redirect(new URL(Routes.Home, request.url));
  } catch (e) {
    return NextResponse.redirect(new URL(Routes.Login, request.url));
  }
}
