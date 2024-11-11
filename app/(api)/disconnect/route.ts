import {cookies} from 'next/headers';
import {NextResponse} from 'next/server';

import {Routes} from '@/app/config/routes';
import {AUTH_COOKIE} from '@/app/config/constants';

export const dynamic = 'force-dynamic'; 
export async function GET(
  request: Request,
) {
  try {
    const awaitedCookie = await cookies();
    awaitedCookie.delete(AUTH_COOKIE);
    return NextResponse.redirect(new URL(Routes.Login, request.url));
  } catch (error) {
    console.log('Error disconnecting account', error);
    return NextResponse.redirect(new URL(Routes.Home, request.url));
  }
}
