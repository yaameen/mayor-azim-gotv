"use server";

import { EncryptJWT, base64url, jwtDecrypt } from "jose"


export const Sign = async (data: any, spec: {
    exp?: Number,
    sub?: string,
} = {}) => {

    const secret = base64url.decode('zH4NRP1HMALxxCFnRZABFA7GOJtzU_gIj02alfL1lvI')
    return await (new EncryptJWT({
        // exp: spec.exp || Math.floor(Date.now() / 1000) + 60 * 15,
        aud: 'https://azimformayor.com',
        iss: 'https://azimformayor.com',
        iat: Math.floor(Date.now() / 1000),
        sub: spec.sub || '1',
        ...data,
    }))
        .setExpirationTime('24h')
        .setProtectedHeader({
            enc: 'A128CBC-HS256',
            alg: 'dir',
        }).encrypt(secret)

}

export const Decrypt = async (cookie: any) => {
    try {

        const secret = base64url.decode('zH4NRP1HMALxxCFnRZABFA7GOJtzU_gIj02alfL1lvI')

        const data = await jwtDecrypt(cookie, secret)

        // const data = await jwtVerify<{
        //     user: any
        // }>(cookie, new TextEncoder().encode(process.env.APP_SECRET), {
        //     algorithms: ['HS256'],
        //     audience: 'https://azimformayor.com',
        //     issuer: 'https://azimformayor.com',
        // });
        return data.payload;

    } catch (error) {
        console.log(`Looks like user session expired.`, error);
    }
}