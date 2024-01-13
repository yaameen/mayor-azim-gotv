import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { GetUser, getCookieParams } from './utils/session';
import { SignJWT } from 'jose';
import { Sign } from './utils/crypt';
import { redirect } from 'next/dist/server/api-utils';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    // try {
    //     const user = await GetUser()
    //     if (!user) {
    //         return NextResponse.redirect(new URL('/authorize', request.url))
    //     }

    //     const resp = NextResponse.next();

    //     if (user) {
    //         const sess = await Sign({ user })
    //         if (resp.cookies.has('gotv_pre_session')) {
    //             resp.cookies.delete('gotv_pre_session');
    //         }

    //         resp.cookies.set('gotv_app_session', sess, getCookieParams());

    //     }

    //     return resp;

    // } catch (error) {
    //     console.log({ error });

    //     return NextResponse.next();
    // }
}


export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!authorize|manifest.json|images|_next/static|_next/image|favicon.ico).*)',
    ],
}