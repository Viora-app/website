import {cookies} from 'next/headers';
import {NextResponse} from 'next/server';

import {AUTH_COOKIE} from '@/app/config/constants';

export const dynamic = 'force-dynamic'; 
export async function GET() {
  try {
    const awaitedCookie = await cookies();
    awaitedCookie.delete(AUTH_COOKIE);
    return NextResponse.json({success: true});
  } catch (error) {
    console.log('Error disconnecting account', error);
    return NextResponse.json({success: false});
  }
}
