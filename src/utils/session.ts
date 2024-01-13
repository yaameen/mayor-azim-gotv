"use server";

import { cookies } from "next/headers";
import { jwtVerify } from 'jose'
import { Decrypt } from "./crypt";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

export interface User {
    id: number
    name: string
    email: string
    email_verified_at: any
    office_id: any
    entity_id: number
    phone: string
    api_enabled: number
    is_staff: number
    verified: number
    last_login_ip: any
    last_login_at: any
    created_at: string
    updated_at: string
}



type ApiProps = {
    headers: any
} & RequestInit
export const Api = (url: string, props?: Partial<ApiProps>) => {
    const entity_id = cookies().get("wide-session");
    const headers = props?.headers ?? {};

    delete props?.headers;

    try {
        return fetch(`${process.env.INTERNAL_API}${url}`, {
            keepalive: true,

            headers: {
                cookie: `${entity_id?.name}=${entity_id?.value};`,
                ...headers,
            },

            ...props,
        }).catch((error) => { });

    } catch (error) {

    }

}

export const getCookieParams = (): Partial<ResponseCookie> => {
    return {
        path: '/',
        secure: true,
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        priority: "high",
        sameSite: 'lax',
    }
}

export const GetUser = async () => {

    const sessionCookie = cookies().get("gotv_app_session");
    if (sessionCookie) {
        const payload = await Decrypt(sessionCookie.value) as any;
        return payload?.user;
    }
    return null;
}