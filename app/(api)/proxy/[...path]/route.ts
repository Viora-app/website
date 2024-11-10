// app/api/proxy/[...path]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getApiUrl } from '@/app/utils/api';

async function proxyRequest(method: string, path: string, request?: NextRequest) {
  const apiUrl = getApiUrl();
  console.log('path', path);

  // Get the JWT from cookies
  const awaitedCookies = await cookies();
  const jwt = awaitedCookies.get('jwt')?.value;

  // Set up headers
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(jwt && { Authorization: `Bearer ${jwt}` }),
  };

  const options: RequestInit = {
    method,
    headers,
  };

  // Attach the request body for POST and PUT
  if (request && (method === 'POST' || method === 'PUT')) {
    const body = await request.json();
    options.body = JSON.stringify(body);
  }

  // Forward the request to Strapi API
  const response = await fetch(`${apiUrl}/${path}`, options);
  const responseData = await response.json();

  return NextResponse.json(responseData, { status: response.status });
};

export async function GET(_request: NextRequest, { params }: { params: { path: string[] } }) {
  const path = params.path.join('/');
  return proxyRequest('GET', path);
}

export async function POST(request: NextRequest, { params }: { params: { path: string[] } }) {
  const path = params.path.join('/');
  return proxyRequest('POST', path, request);
}

export async function PUT(request: NextRequest, { params }: { params: { path: string[] } }) {
  const path = params.path.join('/');
  return proxyRequest('PUT', path, request);
}

export async function DELETE(request: NextRequest, { params }: { params: { path: string[] } }) {
  const path = params.path.join('/');
  return proxyRequest('DELETE', path);
}

