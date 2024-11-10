import {NextResponse} from 'next/server';
import {cookies} from 'next/headers';
import { Routes } from '@/app/config/routes';

export const dynamic = 'force-dynamic'; 
export async function GET(
  request: Request,
) {
  try {
    const awaitedCookie = await cookies();
    awaitedCookie.delete('jwt');
    console.log('URL', request.url);
    console.log('Route', Routes.Login);
    return Response.json({success: true})
  } catch (e) {
    return Response.json({success: false})
  }
}
